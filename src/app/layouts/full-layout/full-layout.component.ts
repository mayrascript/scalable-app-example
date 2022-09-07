import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getNavigationEndEvent } from 'src/app/core/utils/router';

const SMALL_WIDTH_BREAKPOINT = 960;
const PERFECT_SCROLLBAR_UPDATE_TIME = 350;

@Component({
  selector: 'app-layout',
  templateUrl: './full-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  config: PerfectScrollbarConfigInterface = {};
  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url!: string;
  sidePanelOpened = true;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
  };

  @ViewChild('sidemenu') sidemenu!: MatSidenav;
  @ViewChild(PerfectScrollbarDirective) directiveScroll!: PerfectScrollbarDirective;

  private destroy$ = new Subject();

  constructor(private _element: ElementRef, private router: Router, zone: NgZone) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => {
        this.mediaMatcher = mql as any;
      }),
    );
  }

  ngOnInit(): void {
    this.url = this.router.url;

    getNavigationEndEvent(this.router)
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.subscribeToNavegationEndEvent.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePerfectScrollbar();
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePerfectScrollbar(): void {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, PERFECT_SCROLLBAR_UPDATE_TIME);
    }
  }

  private subscribeToNavegationEndEvent(event: NavigationEnd) {
    const el = document.querySelector('.app-inner > .mat-drawer-content > div');
    if (el) el.scrollTop = 0;

    this.url = event.url;
    this.runOnRouteChange();
  }
}
