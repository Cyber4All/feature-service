import { Controller, Get, Patch, Body, Param, BadRequestException, UseGuards, HttpCode } from '@nestjs/common';
import { LearningObjectDto } from './dto/learning-objectDto'
import { LearningObjectsService } from './learning-objects.service';
import { JwtAuthGuard } from './auth/auth.gaurd';
import { SGService } from 'src/services/send-grid/send-grid.service';

@Controller('/featured/learning-objects')
export class LearningObjectsController {
    constructor(private learningObjectService: LearningObjectsService, private sgService: SGService) {}
    @Get()
    @HttpCode(200)
    async getAll(): Promise<LearningObjectDto[]> {
       return await this.learningObjectService.getAllLearningObjects();        
    }
    
    @Get(':cuid')
    async getOne(@Param('cuid') cuid): Promise<LearningObjectDto> {
        return this.learningObjectService.getOneLearningObject(cuid);
    }

    // @UseGuards(JwtAuthGuard)
    @Patch()
    @HttpCode(201)
    async updateAll(@Body() learningObjectDto: LearningObjectDto[]): Promise<{ message: string }> { 
        if (learningObjectDto.length != 5)
        {
            throw new BadRequestException('ERROR!! Array must contain 5 Learning Objects, nothing more & nothing less!!')
        }
       
        // await this.learningObjectService.updateAllFeatured(learningObjectDto);

        const mailInfo = learningObjectDto.map(learningObject=> { 
            return {
                name: learningObject.author.name.split(" ")[0],
                email: learningObject.author.email,
                username: learningObject.author.username,
                objectName: learningObject.name,
                cuid: learningObject.cuid
            }
        });
        await this.sgService.sendFeaturedAuthorEmails(mailInfo);

        return {message: `Learning Objects Updated`};
    }
}