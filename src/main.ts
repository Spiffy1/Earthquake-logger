import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { DbClientsInstance, initAppTable } from './database'
import { ValidationPipe } from '@nestjs/common'

async function initDynamodb() {
  initAppTable()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('GeoLog APIs Docs')
    .setDescription('All APIs using for GeoLog')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  DbClientsInstance.init()
  initDynamodb()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT)

  app.useGlobalPipes(
    new ValidationPipe({
        validatorPackage: require("@nestjs/class-validator"),
    })
);
}


bootstrap()
