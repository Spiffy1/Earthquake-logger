import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { RequestDto } from './dto'
import { EarthQuakeRepository } from './repository/earthquake.repository'

@Injectable()
export class GetGeoLogInterceptor implements NestInterceptor {
  constructor(private readonly earthQuakeRepository: EarthQuakeRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    const requestData: RequestDto = {
      now: Date.now(),
      query: request.query,
      method: request.method,
      url: request.url,
      status: context.getArgByIndex(1).statusCode,
    }

    this.earthQuakeRepository.insertRequest(requestData)

    return next.handle()
  }
}
