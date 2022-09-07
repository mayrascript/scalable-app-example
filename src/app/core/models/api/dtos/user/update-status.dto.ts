import { UserStatus } from 'src/app/core/enums/user-status.enum';

export interface UpdateStatusDto {
  status: UserStatus;
}
