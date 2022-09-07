import { UserDto } from "src/app/core/models/api/dtos/user/user.dto";

export interface LoginUserResponseDto {
  accessToken: string;
  user: UserDto;
}
