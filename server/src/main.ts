import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
   .setTitle('Social network project')
   .setDescription('Forward11 social network API description')
   .setVersion('1.0')
   .addTag('Forward 11 social network API')
   .addBearerAuth('Authorization', 'header')
   .build();
 const document = SwaggerModule.createDocument(app, options);
 SwaggerModule.setup('api', app, document);

  app.use(helmet());
  const bodyParser = require('body-parser');
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

  await app.listen(app.get(ConfigService).port);
}
bootstrap();
