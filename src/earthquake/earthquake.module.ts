import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { DbClientsProvider } from '../database'
import { EarthquakeService } from './earthquake.service'
import { EarthquakeController } from './earthquake.controller'
import { EarthQuakeRepository } from './repository/earthquake.repository'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [EarthquakeController],
  providers: [EarthquakeService, DbClientsProvider, EarthQuakeRepository],
})
export class EarthquakeModule {}
