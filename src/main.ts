import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


/**
* Get port from environment and store in Express.
*/
const PORT = process.env.PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

/**
* set Swagger document builder options
*/
  const options = new DocumentBuilder()
  .setTitle('feature-service')
  .setDescription(`CLARK Utility Service running on localhost: ${PORT}.`)
  .setVersion('1.0')
  .addTag('feature')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

/**
 * Listen on provided port, on all network interfaces.
 */

  await app.listen(PORT);
}
bootstrap();
