import * as mongoose from 'mongoose';

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