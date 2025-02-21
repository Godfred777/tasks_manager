import { Injectable } from '@nestjs/common';
import { Prisma, Task, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getAlltasks(): Promise<Task[]> {
        return this.prisma.task.findMany({
            include:{
                author: true,
                project: true
            }
        });
    }

    async getTaskById(id: string): Promise<Task> {
        return this.prisma.task.findUnique({
            where: { id },
            include:{
                author: true,
                project: true
            }
        });
    }

    async getTasksByProjectId(projectId: string): Promise<Task[]> {
        return this.prisma.task.findMany({ 
             where: { projectId },
             include:{
                author: true,
                project: true
             }
            });
    }

    async getTasksByUserId(
        authorId: string,
        orderby: Prisma.TaskOrderByWithRelationInput    
    ): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { authorId },
            orderBy: orderby,
            include:{
                author: true,
                project: true
            }
        });
    }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
            include:{
                author: true,
                project: true

            }
        });
    }

    async updateTask(params: {
        where: Prisma.TaskWhereUniqueInput;
        data: Prisma.TaskUpdateInput;
    }): Promise<Task> {
        const { where, data } = params;
        return this.prisma.task.update({
            data,
            where,
            include:{
                author: true,
                project: true
            }
        });
    }

    async updateTaskStatus(id: string, status: Status): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data: { status },
            include:{
                author: true,
                project: true
            }
        });
    }

    async deleteTask(id: string): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
            include:{
                author: true,
                project: true
            }
        });
    }
}
