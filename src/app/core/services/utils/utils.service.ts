import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  getUserFullName(user: User | undefined): string {
    return `${user?.firstName} ${user?.lastName}`;
  }
}
