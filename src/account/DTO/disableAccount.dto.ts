import { IsInt } from "@nestjs/class-validator";

export class DisableAccountDTO {
    @IsInt()
    clientId: number;
    @IsInt()
    accountId: number;
}
