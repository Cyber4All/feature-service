import { LearningObjectDto } from './dto/learning-objectDto';
import * as request from 'supertest';

const app = 'http://localhost:3000';
const learningObjectDto = new LearningObjectDto();
const learningObjectDtoList = [learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto];

describe('getAllLearningObjects', () => {
  it('get all learning objects', () => {
    return request(app)
    .get('/featured/learning-objects')
    .expect(200)
  });
});

describe('updateAllFeatured', () => {
  it('update route', () => {
    return request(app)
    .patch('/featured/learning-objects')
    .set('Accept', 'application/json')
    .send(learningObjectDtoList)
    .expect(201)
    .expect('{"message":"Learning Objects Updated"}')
  });
});