const {MongoClient, ObjectID} = require('mongodb');
const SEED = require('./data')

let connection;
let db;

async function seedDatabase(uri){ 
    console.log(uri)
    connection = await MongoClient.connect(uri);
    db = connection.db();
    
    await db.createCollection('learningObjects');

    await db.collection('learningObjects').insertMany([
        SEED.LEARNING_OBJECT_MOCK,
    ])

}

module.exports = seedDatabase;
