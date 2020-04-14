import { Module } from '@nestjs/common';
import { LearningObjectsController } from './learning-objects.controller';
import { LearningObjectsService } from './learning-objects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningObjectSchema } from './schemas/learning-objectSchema';
import { JwtStrategy } from './auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [MongooseModule.forFeature([{name: 'LearningObject', schema: LearningObjectSchema}])],
  controllers: [LearningObjectsController],
  providers: [LearningObjectsService, JwtStrategy],
})
export class LearningObjectModule {}