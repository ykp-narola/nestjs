import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, retry } from 'rxjs';
// nest g guard guards/auth    // create guard via this command
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No token provided");
      return false;
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    return token === "123"
    // Verify token
    // try {
    //   // const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    //   const decoded = token
    //   request.user = decoded; // Attach user to request
    //   return true;
    // } catch (error) {
    //   console.error("Invalid token", error);
    //   return false;
  }
}

