import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import { Role } from "src/shared/enums/role.enum";

export class SignupDto {
    @IsOptional()
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message:
        'Password must contain uppercase, lowercase, number, and special character',
    },
  )
    password: string;

    @IsNotEmpty({ message: 'Role is required' })
    role: Role.USER | Role.OWNER;
}