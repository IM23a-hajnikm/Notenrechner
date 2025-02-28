import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * You can create a DTO for login data:
 */
class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validate the user credentials
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token and return it
    return this.authService.login(user);
  }
}
