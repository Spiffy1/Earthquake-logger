import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { DbClientsProvider } from '../database'
import { EarthquakeService } from './earthquake.service'
import { EarthQuakeRepository } from './repository/earthquake.repository'

describe('EarthquakeService', () => {
  let service: EarthquakeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [EarthquakeService, DbClientsProvider, EarthQuakeRepository],
    }).compile()

    service = module.get<EarthquakeService>(EarthquakeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
