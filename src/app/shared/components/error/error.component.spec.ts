import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';

import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { createSpyObj } from 'src/app/core/utils/create-spy-obj';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [{ provide: FormGroupDirective, useValue: createSpyObj(FormGroupDirective) }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
