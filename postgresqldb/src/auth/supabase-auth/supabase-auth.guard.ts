import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private jwksClients = new Map<string, jwksRsa.JwksClient>();

  constructor(
    private configService: ConfigService
  ) { }

  private getJwksClient(jwksUri: string): jwksRsa.JwksClient {
    let client = this.jwksClients.get(jwksUri);
    if (!client) {
      client = jwksRsa({
        jwksUri,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
      });
      this.jwksClients.set(jwksUri, client);
    }
    return client;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    let token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token found');
    }

    try {
      token = token.split(' ')[1];

      // Decode token first to read the header without verification
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || typeof decoded === 'string' || !decoded.header) {
        throw new UnauthorizedException('Invalid token format');
      }

      const alg = decoded.header.alg;

      if (alg === 'HS256') {
        const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
        if (!secret) {
          throw new UnauthorizedException('SUPABASE_JWT_SECRET not configured');
        }
        const verified = jwt.verify(token, secret, { algorithms: ['HS256'] });
        request['user'] = verified;
        return true;
      } else if (alg === 'ES256') {
        const kid = decoded.header.kid;
        if (!kid) {
          throw new UnauthorizedException('No key ID found in token header');
        }

        // Get issuer claim from payload
        const payload = decoded.payload as jwt.JwtPayload;
        const issuer = payload?.iss;
        if (!issuer) {
          throw new UnauthorizedException('No issuer found in token');
        }

        // Validate that issuer is a trusted Supabase domain or localhost (for development)
        const isSecureIssuer =
          issuer.startsWith('https://') &&
          (issuer.endsWith('.supabase.co/auth/v1') || issuer.endsWith('.supabase.net/auth/v1'));
        const isLocalIssuer = issuer.startsWith('http://localhost:') || issuer.startsWith('http://127.0.0.1:');

        if (!isSecureIssuer && !isLocalIssuer) {
          throw new UnauthorizedException('Untrusted token issuer');
        }

        const jwksUri = `${issuer}/.well-known/jwks.json`;
        const client = this.getJwksClient(jwksUri);

        const key = await client.getSigningKey(kid);
        const publicKey = key.getPublicKey();

        const verified = jwt.verify(token, publicKey, { algorithms: ['ES256'] });
        request['user'] = verified;
        return true;
      } else {
        throw new UnauthorizedException(`Unsupported algorithm: ${alg}`);
      }
    } catch (error) {
      console.error('SupabaseAuthGuard verification failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

