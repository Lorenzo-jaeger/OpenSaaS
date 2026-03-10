import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceInput } from '@opensaas/shared';
import { Role } from '@prisma/client';

@Injectable()
export class WorkspaceService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: CreateWorkspaceInput) {
        const existing = await this.prisma.workspace.findUnique({
            where: { slug: data.slug },
        });

        if (existing) {
            throw new ConflictException('Este slug já está sendo usado.');
        }

        return this.prisma.workspace.create({
            data: {
                name: data.name,
                slug: data.slug,
                memberships: {
                    create: {
                        userId,
                        role: Role.ADMIN,
                    },
                },
            },
        });
    }

    async findAllByUser(userId: string) {
        return this.prisma.workspace.findMany({
            where: {
                memberships: {
                    some: { userId },
                },
            },
            include: {
                _count: {
                    select: { memberships: true, projects: true },
                },
            },
        });
    }

    async findBySlug(slug: string, userId: string) {
        const workspace = await this.prisma.workspace.findFirst({
            where: {
                slug,
                memberships: {
                    some: { userId },
                },
            },
            include: {
                projects: true,
                memberships: {
                    include: { user: { select: { name: true, email: true } } },
                },
            },
        });

        if (!workspace) {
            throw new NotFoundException('Workspace não encontrado ou sem permissão.');
        }

        return workspace;
    }
}
