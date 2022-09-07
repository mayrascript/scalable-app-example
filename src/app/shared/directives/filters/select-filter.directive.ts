import {
  Directive,
  Input,
  ElementRef,
  Self,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// tslint:disable-next-line: interface-over-type-literal
type SearchType = {
  _page: number;
  _limit?: number;
  [key: string]: string | number | undefined;
};

@Directive({
  selector: '[appSelectFilter]',
})
export class SelectFilterDirective implements AfterViewInit, OnDestroy {
  @Input('appSelectFilter') name!: string;
  @Output() queryChange = new EventEmitter<SearchType>();

  private destroy$ = new Subject();

  constructor(public elementRef: ElementRef<HTMLElement>, @Self() public select: MatSelect) {}

  ngAfterViewInit() {
    const source$ = this.getSource();
    source$.pipe(takeUntil(this.destroy$)).subscribe(query => this.queryChange.emit(query));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSource() {
    return this.select.selectionChange.pipe(
      map(change =>
        Array.isArray(change.value) ? change.value.join(',') : `${change.value || ''}`,
      ),
      map(value => ({ _page: 0, [this.name]: value })),
    );
  }
}
