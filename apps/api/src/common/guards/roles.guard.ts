import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "../decorators/roles.decorator";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user, params } = context.switchToHttp().getRequest();
        const workspaceId = params.workspaceId;

        if (!user || !workspaceId) {
            return false;
        }

        const membership = await this.prisma.membership.findFirst({
            where: {
                userId: user.id,
                workspaceId: workspaceId,
            },
        });

        if (!membership) {
            return false;
        }

        return requiredRoles.includes(membership.role as Role);
    }
}
