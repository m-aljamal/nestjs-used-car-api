import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// only class
interface ClassConstructor {
  new (...args: any[]): {};
}
// create decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// implements is check if SerializeInterceptor  chaeck all methods in  NestInterceptor
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //   run somthing befor a request is handled
    // by the request handler
    //! console.log('run befor the request handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        // run somthing befor response is sent
        //! console.log('run befor res is sent ', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // remove the info that we exclode from user.dto
        });
      }),
    );
  }
}
