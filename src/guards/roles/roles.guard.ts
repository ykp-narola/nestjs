import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // To access the metadata we injected via the @Roles() decorator, we need to inject the Reflector service
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // It retrieves the roles metadata from both the controller class and the handler method, using the reflector
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are defined, allow access
    if (!requiredRoles) {
      return true;
    }

    // get roles from header
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();

    const roleHeader = request.headers['x-user-role'] as Role;
    console.log("roles are ", requiredRoles);
    console.log("header role is ", roleHeader);

    return requiredRoles.includes(roleHeader);
  }
}
