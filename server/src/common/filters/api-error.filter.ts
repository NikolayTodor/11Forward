import { ApiSystemError } from './../exceptions/api-system.error';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';


@Catch(ApiSystemError)
export class ApiSystemErrorFilter implements ExceptionFilter {
 public catch(exception: ApiSystemError, host: ArgumentsHost) {
   const ctx = host.switchToHttp();
   const response = ctx.getResponse<Response>();
   response.status(exception.code).json({
     status: exception.code,
     error: exception.message,
   });
 }
}
