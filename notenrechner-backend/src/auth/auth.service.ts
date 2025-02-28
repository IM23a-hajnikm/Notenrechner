import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  /**
   * 1) Fetch user from DB using UsersService
   * 2) Compare provided password with stored (hashed) password
   * 3) Return user object if valid, otherwise null
   */
  async validateUser(username: string, pass: string): Promise<any> {
    // Adjust to match how you store and look up your user
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }

    // Compare the hashed password with the provided one
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      return null;
    }

    // Remove password before returning
    const { password, ...result } = user;
    return result;
  }

  /**
   * Generates a JWT access token for a valid user.
   */
  async login(user: any) {
    // Include any user info you need in the payload
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
