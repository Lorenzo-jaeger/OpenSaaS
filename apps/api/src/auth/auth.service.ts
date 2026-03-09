import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from '@opensaas/shared';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            },
        });

        const { password, ...result } = user;
        return {
            user: result,
            access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
        };
    }

    async login(data: LoginInput) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const { password, ...result } = user;
        return {
            user: result,
            access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
        };
    }

    async validateUser(payload: any) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: {
                memberships: {
                    include: { workspace: true },
                },
            },
        });

        if (!user) return null;
        const { password, ...result } = user;
        return result;
    }
}
