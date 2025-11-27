import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateLocationDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    type: string;

    @IsNumber()
    cost: number;

    @IsNumber()
    ownerId: number;
    
}
