import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.ProjectCreateInput): Promise<Project> {
        return this.prisma.project.create({
            data,
        });
    }

    async findAll(): Promise<Project[]> {
        return this.prisma.project.findMany();
    }

    async findOneById(id: string): Promise<Project | null> {
        return this.prisma.project.findUnique({
            where: { id },
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
        });
    }

    async remove(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
        return this.prisma.project.delete({
            where,
        });
    }
}
