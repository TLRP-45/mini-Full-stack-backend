import { IsInt } from "@nestjs/class-validator";

export class UpdateAccountTransactionDTO {
    @IsInt()
    idAccRemitent: number;
    @IsInt()
    idAccReciver: number;
    @IsInt()
    transAmountValue: number;
}