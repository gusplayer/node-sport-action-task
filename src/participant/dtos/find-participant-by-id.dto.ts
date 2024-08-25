import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindParticipantByIdDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;
}
