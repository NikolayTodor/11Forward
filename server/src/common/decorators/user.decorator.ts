import { createParamDecorator } from '@nestjs/common';

export const userDecorator = createParamDecorator((_, req) => req.user);
