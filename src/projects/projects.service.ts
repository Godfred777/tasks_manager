import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.ProjectCreateInput): Promise<Project> {
        return this.prisma.project.create({
            data,
            include: {
                author: true
            }
        });
    }

    async findAll(): Promise<Project[]> {
        return this.prisma.project.findMany({
            include: {
                author: true
            }
        });
    }

    async findOneById(id: string): Promise<Project | null> {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                author: true
            }
        });
    }

    async findAllByUserId(params: {
        where: Prisma.ProjectWhereInput;
        orderBy: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<Project[]> {
        const { where, orderBy } = params;
        return this.prisma.project.findMany({
            where,
            orderBy,
            include: {
                author: true
            }
        });
    }

    async update(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<Project> {
        const { where, data } = params;
        return this.prisma.project.update({
            data,
            where,
            include: { author: true }
        });
    }

    async remove(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
        return this.prisma.project.delete({
            where,
        });
    }
}
