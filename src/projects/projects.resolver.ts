import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Project } from './entities/projects.entity';

@Resolver()
export class ProjectsResolver {
    constructor(private projectsService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Project)
    async createProject(
        @Args('input') projectDto: CreateProjectDto,
        @Context() context    
    ) {
        const project = {
            name: projectDto.name,
            description: projectDto.description,
            author: { connect: { id: context.req.user.id } },
        }
        return await this.projectsService.create(project);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Project])
    async getProjects() {
        return await this.projectsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Project, { nullable: true })
    async getProjectById(@Args('id') id: string) {
        return await this.projectsService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Project])
    async getProjectsByUserId(@Context() context) {
        return await this.projectsService.findAllByUserId({
            where: { authorId: context.req.user.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Project)
    async updateProject(
        @Args('id') id: string,
        @Args('input') projectDto: UpdateProjectDto
    ) {
        const updateData = {
            where: { id },
            data: {
                name: projectDto.name,
                description: projectDto.description
            }
        }
        return await this.projectsService.update(updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Project)
    async deleteProject(@Args('id') id: string) {
        return await this.projectsService.remove({ id });
    }
}
