import { LearningObjectDto } from './dto/learning-objectDto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { LearningObjectModule } from './leaning-object.module';
import { LearningObjectsService } from './learning-objects.service';
import { LearningObjectSchema } from './schemas/learning-objectSchema';
import { LearningObjectsController } from './learning-objects.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppService } from '../app.service';
import { AppController } from '../app.controller';
import { from } from 'rxjs';
import jwt = require('jsonwebtoken');

import fs = require('fs');
let globalConfig = JSON.parse(fs.readFileSync('./test_environment/globalConfig.json', 'utf-8'));

describe("LearningObjectController (e2e)", () => {
  let app: INestApplication;

  let learningObjectDto: LearningObjectDto = new LearningObjectDto();
  let learningObjectDtoList = [learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto];
  let expectedResponse = [{}, {}, {}, {}, {}];
  let learningService = { getAllLearningObjects: () => learningObjectDtoList, 
    updateAllFeatured: () => learningObjectDtoList};

  beforeEach(async () => {
    process.env.KEY = 'THIS_IS_A_KEY';
    process.env.ISSUER = "THIS_IS_AN_ISSUER"
    process.env.CLARK_DB_URI_DEV = globalConfig.mongoUri;
    
    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(process.env.CLARK_DB_URI_DEV, { useUnifiedTopology: true,useNewUrlParser: true }), 
        MongooseModule.forFeature([{name: 'LearningObject', schema: LearningObjectSchema}])],
      controllers: [LearningObjectsController],
      providers: [LearningObjectsService,JwtStrategy],
    })
    .overrideProvider(LearningObjectsService)
    .useValue(learningService)
    .compile()

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/ (GET) learningObjects', () => {
    return request(app.getHttpServer())
      .get('/featured/learning-objects')
      .expect(200)
      .expect(expectedResponse)
  });

    it('update route', () => {
    return request(app.getHttpServer())
    .patch('/featured/learning-objects')
    .set('Accept', 'application/json')
    .set ('Authorization', 'Bearer '+ generateUserToken('admin'))
    .send(learningObjectDtoList)
    .expect(201)
    .expect('{"message":"Learning Objects Updated"}')
  });

  afterAll(done => {
    app.close();
    done();
  });

});

function generateUserToken(privilege) {
  const payload = {
      id: 'test_id',
      username: 'test123',
      name: 'test account',
      email: 'test@gmail.com',
      organization: 'test',
      emailVerified: true,
      accessGroups: [privilege]
  };
  const options = {
      issuer: process.env.ISSUER,
      expiresIn: 86400,
      audience: 'test123'
  };
  const token = jwt.sign(payload, process.env.KEY, options);
  return token;
}