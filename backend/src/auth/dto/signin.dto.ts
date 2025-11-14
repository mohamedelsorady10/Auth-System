import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  password: string;
}
