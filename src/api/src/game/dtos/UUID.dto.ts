import { IsUUID } from 'class-validator';


export class AuthTokenDto {
  @IsUUID()
  public authToken : string;
}
