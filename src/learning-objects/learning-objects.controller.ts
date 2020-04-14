import { Controller, Get, Patch, Body, Param, BadRequestException, UseGuards, HttpCode,} from '@nestjs/common';
import { LearningObjectDto } from './dto/learning-objectDto'
import { LearningObjectsService } from './learning-objects.service';
import {JwtAuthGuard } from './auth/auth.gaurd'

@Controller('learning-objects')
export class LearningObjectsController {
    constructor(private learningObjectServive: LearningObjectsService) {}
    @Get()
    async getAll(): Promise<LearningObjectDto[]> {
        
        return await this.learningObjectServive.getAll();
    }
    
    @Get(':cuid')
    async getLearningObject(@Param('cuid') cuid): Promise<LearningObjectDto> {
        return this.learningObjectServive.getOne(cuid);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @HttpCode(201)
    async updateAll(@Body() learningObjectDto: LearningObjectDto[]): Promise<{ message: string }> { 
        if (learningObjectDto.length != 5)
        {
            throw new BadRequestException('ERROR!! Array must contain 5 Learning Objects, nothing more & nothing less!!')
        }
        await this.learningObjectServive.updateAll(learningObjectDto);

        return {message: `Learning Objects Updated`};
    }
}