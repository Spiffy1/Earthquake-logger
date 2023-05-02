import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core'
import { EarthquakeModule } from './earthquake/earthquake.module'

@Module({
  imports: [CoreModule, ConfigModule.forRoot(), EarthquakeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
