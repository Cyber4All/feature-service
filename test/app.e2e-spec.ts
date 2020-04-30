import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';
import { LearningObjectModule } from '../src/learning-objects/leaning-object.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../src/app.controller';

const  fs = require('fs');
let globalConfig = JSON.parse(fs.readFileSync('./test_environment/globalConfig.json', 'utf-8'));

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.KEY = 'THIS_IS_A_KEY';
    process.env.CLARK_DB_URI_DEV = globalConfig.mongoUri;

    const moduleFixture = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(process.env.CLARK_DB_URI_DEV, { useUnifiedTopology: true,useNewUrlParser: true })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to CLARK Feature-Service');
  });

  afterAll(done => {
    app.close();
    done();
  });

});
