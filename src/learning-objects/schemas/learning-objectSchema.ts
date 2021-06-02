import * as mongoose from 'mongoose';
import { strict } from 'assert';

const AuthorSchema = new mongoose.Schema ({
    name: String,
    username: String,
    email: String,
    organization: String,
},{
    _id:false,
});

const ContributorSchema = new mongoose.Schema ({ 
    name: String,
    organization: String,
});

export const LearningObjectSchema = new mongoose.Schema ({

    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    author: AuthorSchema,
    date: String,
    collectionName: String, //collection is a mongoose reserve word
    contributors: [ContributorSchema],
    description: String,
    cuid: String,
    length: String,
    levels: [String],
    name: String,
    version: Number,
    status: String,
},{
    _id:true,
    versionKey:false,
    collection : 'learning-objects',
    strict: true,
});