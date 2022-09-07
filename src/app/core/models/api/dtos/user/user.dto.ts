import { UserStatus } from 'src/app/core/enums/user-status.enum';
import { UserRole } from 'src/app/core/enums/user-role.enum';
import { PageQuery } from 'src/app/core/models/api/http/page-query';
import { SearchQuery } from 'src/app/core/models/api/http/search-query';

export interface UserDto {
  readonly id?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly status?: UserStatus;
  readonly role?: UserRole;
  readonly active?: boolean;
  readonly emailVerified?: boolean;
}

export interface UserQuery extends PageQuery, SearchQuery {
  role?: UserRole.pricing | UserRole.loadGenerator;
}

export interface UserDocumentDto {
  id?: string;
  mimeType: string;
  size: number;
  filename: string;
}
