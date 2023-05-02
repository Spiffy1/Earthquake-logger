import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { DbClientsProvider } from '../database'
import { EarthquakeController } from './earthquake.controller'
import { EarthquakeService } from './earthquake.service'
import { EarthQuakeRepository } from './repository/earthquake.repository'

describe('EarthquakeController', () => {
  let controller: EarthquakeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [EarthquakeController],
      providers: [EarthquakeService, DbClientsProvider, EarthQuakeRepository],
    }).compile()

    controller = module.get<EarthquakeController>(EarthquakeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
