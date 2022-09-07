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
import { MatInput } from '@angular/material/input';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { queryTextSearch } from 'src/app/core/utils/rx-text-filter';

// tslint:disable-next-line: interface-over-type-literal
type SearchType = {
  _page: number;
  _limit?: number;
  [key: string]: string | number | undefined;
};

@Directive({
  selector: '[appTextFilter]',
})
export class TextFilterDirective implements AfterViewInit, OnDestroy {
  @Input('appTextFilter') name!: string;
  @Output() queryChange = new EventEmitter<SearchType>();

  private destroy$ = new Subject();

  constructor(@Self() public input: MatInput) {}

  ngAfterViewInit() {
    const source$ = this.getSource();
    source$.pipe(takeUntil(this.destroy$)).subscribe(query => this.queryChange.emit(query));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSource() {
    return fromEvent<any>(
      ((this.input as any)._elementRef as ElementRef).nativeElement,
      'input',
    ).pipe(queryTextSearch(this.name));
  }
}
