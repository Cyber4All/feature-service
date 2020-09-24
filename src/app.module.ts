import { Module } from '@nestjs/common';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningObjectModule } from './learning-objects/leaning-object.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LearningObjectModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CLARK_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    SendGridModule.forRoot({ 
      apiKey: process.env.SENDGRID_KEY
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
