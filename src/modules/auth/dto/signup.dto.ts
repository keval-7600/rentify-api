import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import { Role } from "src/shared/enums/role.enum";

export class SignupDto {
    @IsOptional()
    @ApiPropertyOptional({ description: 'Name of the user', example: 'John' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    @ApiProperty({ description: 'Email address of the user', example: 'LbCwI@example.com' })
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
    @ApiProperty({ description: 'Password for the user', example: 'P@ssw0rd' })
    password: string;

    @IsNotEmpty({ message: 'Role is required' })
    @ApiProperty({ description: 'Role of the user', example: 'user' })
    role: Role.USER | Role.OWNER;
}