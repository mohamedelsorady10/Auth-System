import { Injectable, UnauthorizedException, Inject, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  async signup(signupDto: SignupDto) {
    this.logger.log(`Signup attempt for email: ${signupDto.email}`, 'AuthService');

    const user = await this.usersService.create(signupDto);

    const payload = { email: user.email, sub: (user as any)._id };
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`User signed up successfully: ${user.email}`, 'AuthService');

    return {
      accessToken,
      user: {
        id: (user as any)._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async signin(signinDto: SigninDto) {
    this.logger.log(`Signin attempt for email: ${signinDto.email}`, 'AuthService');

    const user = await this.usersService.findByEmail(signinDto.email);

    if (!user) {
      this.logger.warn(`Signin failed: User not found - ${signinDto.email}`, 'AuthService');
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      signinDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(`Signin failed: Invalid password - ${signinDto.email}`, 'AuthService');
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: (user as any)._id };
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`User signed in successfully: ${user.email}`, 'AuthService');

    return {
      accessToken,
      user: {
        id: (user as any)._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
