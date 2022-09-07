import { Directive, ElementRef, HostBinding, Input, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appProgressButton]',
})
export class ProgressButtonDirective {
  @HostBinding('class.active') active = false;

  @Input()
  set appProgressButton(value: boolean | null | undefined) {
    this.active = !!value;
    this.ref.markForCheck();
  }

  constructor(private el: ElementRef<HTMLButtonElement>, private ref: ChangeDetectorRef) {
    this.el.nativeElement.classList.add('app-progress-button');
  }
}
