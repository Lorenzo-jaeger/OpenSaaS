import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [AuthModule, WorkspaceModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule { }
