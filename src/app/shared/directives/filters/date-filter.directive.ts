import {
  Directive,
  Input,
  Self,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// tslint:disable-next-line: interface-over-type-literal
type SearchType = {
  _page: number;
  _limit?: number;
  [key: string]: string | number | undefined | null;
};

@Directive({
  selector: '[appDateFilter]',
})
export class DateFilterDirective implements AfterViewInit, OnDestroy {
  @Input('appDateFilter') name!: string;
  @Output() queryChange = new EventEmitter<SearchType>();

  private destroy$ = new Subject();

  constructor(@Self() public input: MatDatepickerInput<Date>) {}

  ngAfterViewInit() {
    const source$ = this.getSource();
    source$.pipe(takeUntil(this.destroy$)).subscribe(query => this.queryChange.emit(query));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSource() {
    return this.input.dateChange.pipe(
      map(change => ({ _page: 0, [this.name]: change.value && change.value.toISOString() })),
    );
  }
}
