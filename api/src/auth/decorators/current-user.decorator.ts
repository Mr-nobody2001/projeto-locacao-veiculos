import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Cliente} from "../../cliente/entities/cliente.entity";
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): Cliente => {
        const request = context.switchToHttp().getRequest<AuthRequest>();

        return request.user;
    },
);