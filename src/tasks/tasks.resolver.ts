import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { CreateTask, UpdateTask } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Status } from '@prisma/client';

@Resolver()
export class TasksResolver {
    constructor(private tasksService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Task)
    async createTask(
        @Args('input') taskDto: CreateTask,
        @Context() context
    ) {
        const task = {
            title: taskDto.title,
            content: taskDto.content,
            author: { connect: { id: context.req.user.id } },
        }
        return await this.tasksService.createTask(task);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Task)
    async createTaskUnderProject(
        @Args('projectId') projectId: string,
        @Args('input') taskDto: CreateTask,
        @Context() context
    ) {
        const task = {
            title: taskDto.title,
            content: taskDto.content,
            author: { connect: { id: context.req.user.id } },
            project: { connect: { id: projectId } }
        }
        return await this.tasksService.createTask(task);
    }
    
    @UseGuards(JwtAuthGuard)
    @Query(() => [Task])
    async getTasks() {
        return await this.tasksService.getAlltasks();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Task, { nullable: true })
    async getTaskById(@Args('id') id: string) {
        return await this.tasksService.getTaskById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Task])
    async getTasksByProjectId(@Args('projectId') projectId: string) {
        return await this.tasksService.getTasksByProjectId(projectId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Task])
    async getTasksByUserId(@Context() context) {
        return await this.tasksService.getTasksByUserId(
            context.req.user.id,
            { createdAt: 'desc' }
        );
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Task)
    async updateTask(
        @Args('id') id: string,
        @Args('input') taskDto: UpdateTask,
    ) {
        const updateData = {
            where: { id },
            data: {
                title: taskDto.title,
                content: taskDto.content,
            }
        }
        return await this.tasksService.updateTask(updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Task)
    async updateTaskStatus(
        @Args('id') id: string,
        @Args('status') status: Status
    ) {
        const updateData = {
            where: { id },
            data: {
                status
            }
        }
        return await this.tasksService.updateTask(updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async deleteTask(@Args('id') id: string) {
        return await this.tasksService.deleteTask(id);
    }
}
