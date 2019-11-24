import { createParamDecorator } from '@nestjs/common';

export const token = createParamDecorator(
  (_, req) => req.headers.authorization,
);
