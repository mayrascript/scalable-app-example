import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export const queryTextSearch = (name: string, debounceTimeValue = 300) => (obs: Observable<any>) =>
  obs.pipe(
    debounceTime(debounceTimeValue),
    map(e => e.target.value as string),
    map(value => ({ _page: 0, [name]: value })),
  );
