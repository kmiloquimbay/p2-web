import { IsBoolean, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCharacterDto {
    
    @IsString()
    @MinLength(2)
    name: string;

    @IsNumber()
    salary: number;

    @IsBoolean()
    employee: boolean;
}
