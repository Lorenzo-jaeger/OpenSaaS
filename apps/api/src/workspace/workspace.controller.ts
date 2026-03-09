import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceSchema } from '@opensaas/shared';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';

@Controller('workspaces')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) { }

    @Post()
    async create(@User() user: any, @Body() data: any) {
        const validated = CreateWorkspaceSchema.parse(data);
        return this.workspaceService.create(user.id, validated);
    }

    @Get()
    async findAll(@User() user: any) {
        return this.workspaceService.findAllByUser(user.id);
    }

    @Get(':slug')
    async findBySlug(@User() user: any, @Param('slug') slug: string) {
        return this.workspaceService.findBySlug(slug, user.id);
    }
}
