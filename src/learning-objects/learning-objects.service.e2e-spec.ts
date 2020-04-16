import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectDto } from './dto/learning-objectdto';
import * as request from 'supertest';

const app = 'http://localhost:3000';
let learningObjectDto = new LearningObjectDto();
let learningObjectDtoList = [learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto];

describe('getAllLearningObjects', () => {
  it('get all learning objects', () => {
    return request(app)
    .get('/learning-objects')
    .expect(200)
  });
});

describe('updateAllFeatured', () => {
  it('update route', () => {
    return request(app)
    .patch('/learning-objects')
    .set('Accept', 'application/json')
    .send(learningObjectDtoList)
    .expect(201)
    .expect('{"message":"Learning Objects Updated"}')
  });
});
