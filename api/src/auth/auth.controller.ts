import {Controller, HttpCode, HttpStatus, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthRequest} from "./models/AuthRequest";
import {IsPublic} from "./decorators/is-public.decorator";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
