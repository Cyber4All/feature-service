import * as mongoose from 'mongoose';
import{ IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export interface LearningObject extends mongoose.Document {
    author: {
        name: string,
        username: string,
        email: string,
        organization: string,
    },
    collections: string,
    contributors: [];
    description: string,
    cuid?: string,
    length: string,
    name: string,
    levels: string,
    outcomes: [string],
    version: number,
    status: string,
};