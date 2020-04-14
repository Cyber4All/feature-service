import { Injectable, UseGuards } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LearningObjectDto } from './dto/learning-objectDto';
import { LearningObjectSchema } from './schemas/learning-objectSchema';

@Injectable()
export class LearningObjectsService {
    
    constructor(@InjectModel('LearningObject') private learningObjectModel: Model<any>){}

    async getAll(): Promise<LearningObjectDto[]> {
        return await this.learningObjectModel.find({}, {"_id":false}).limit(5);
    }

    async getOne(cuid: string): Promise<LearningObjectDto> {                                                                                                                              
        return await this.learningObjectModel.findOne({cuid: cuid}, {"_id":false})
    }

    async updateAll (learningObject: LearningObjectDto[]): Promise<LearningObjectDto[]> {
        await this.learningObjectModel.deleteMany({})
        const publishLearningObject = await this.learningObjectModel.insertMany(learningObject)
        return publishLearningObject; 
    }
}