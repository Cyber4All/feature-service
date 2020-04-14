import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningObjectModule } from './learning-objects/leaning-object.module';


@Module({
  imports: [LearningObjectModule, MongooseModule.forRoot('mongodb://mongodb:27017/feature', { useUnifiedTopology: true,useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
