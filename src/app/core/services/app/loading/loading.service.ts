import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject(false);
  isLoading$ = this.loading.asObservable();
  start = () => this.loading.next(true);
  complete = () => this.loading.next(false);
}
