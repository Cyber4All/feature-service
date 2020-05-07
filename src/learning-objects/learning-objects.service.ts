import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LearningObjectDto } from './dto/learning-objectDto';

@Injectable()
export class LearningObjectsService {
    
    constructor(@InjectModel('LearningObject') private learningObjectModel: Model<any>){}

    async getAllLearningObjects(): Promise<LearningObjectDto[]> {
        const documents = await this.learningObjectModel.find({}, {"_id":false}).limit(5);
        // const variable = documents.map(d => LearningObjectDto.newLearningObjectDto(d));
        // console.log(variable)
        return documents
    }
 
    async getOneLearningObject(cuid: string): Promise<LearningObjectDto> {                                                                                                                              
        return await this.learningObjectModel.findOne({cuid: cuid}, {"_id":false})
    }

    async updateAllFeatured (learningObject: LearningObjectDto[]): Promise<LearningObjectDto[]> {
        await this.learningObjectModel.deleteMany({});
        const payload = learningObject.map(l => {
            return {...l, collectionName:l.collection}
        });
        const publishLearningObject = await this.learningObjectModel.insertMany(payload);
        return publishLearningObject; 
    }
}