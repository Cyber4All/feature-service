import * as mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema ({
    name: String,
    username: String,
    organization: String,
},{
    _id:false,
})

const ContributorSchema = new mongoose.Schema({ name: String});
const OutcomeSchema = new mongoose.Schema({ name: String});

export const LearningObjectSchema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    author: AuthorSchema,
    collectionName: String, //collection is a mongoose reserve word
    contributors: [ContributorSchema],
    description: String,
    cuid: String,
    length: String,
    name: String,
    outcomes: [OutcomeSchema],
    version: Number,
    status: String,
},{
    _id:true,
    versionKey:false,
    collection : 'learning-objects'
});

