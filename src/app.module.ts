import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningObjectModule } from './learning-objects/leaning-object.module';


@Module({
  imports: [LearningObjectModule, MongooseModule.forRoot(process.env.CLARK_DB_URI_DEV, { useUnifiedTopology: true,useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
