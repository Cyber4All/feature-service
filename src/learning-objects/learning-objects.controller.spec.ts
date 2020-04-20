import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectsController } from './learning-objects.controller';
import { LearningObjectsService } from './learning-objects.service';
import { LearningObjectDto } from './dto/learning-objectDto';
import { getModelToken } from '@nestjs/mongoose';


describe('LearningObjects Controller', () => {
  let learningObjectsController: LearningObjectsController;
  let learningObjectsService: LearningObjectsService;
  const learningObjectDto = new LearningObjectDto();
  const learningObjectDtoList = [learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto, learningObjectDto];


  beforeEach(async () => {
    const moduleRef:TestingModule = await Test.createTestingModule({
      controllers: [LearningObjectsController],
      providers: [
        LearningObjectsService,
        {
          provide: getModelToken('LearningObject'),
          useValue: learningObjectDtoList,
        }
      ],
      imports: [],
    }).compile();

    learningObjectsService = moduleRef.get<LearningObjectsService>(LearningObjectsService);
    learningObjectsController = moduleRef.get<LearningObjectsController>(LearningObjectsController);
  });

  it('should be defined', () => {
    expect(learningObjectsController).toBeDefined();
  })

  describe('getAll', () => {
    it('should return an array of 5 learning objects', async () => {
      jest.spyOn(learningObjectsService, 'getAll').mockImplementation(async () => learningObjectDtoList);
      expect(await learningObjectsController.getAll()).toEqual(learningObjectDtoList);
    })
  });

  describe('updateAll', () => {
    it('Update array of all 5 learning objects', async () => {
      jest.spyOn(learningObjectsService, 'updateAll').mockImplementation(async () => learningObjectDtoList);
      expect(await learningObjectsController.updateAll(learningObjectDtoList)).toHaveProperty('message');
    })
  });
});
