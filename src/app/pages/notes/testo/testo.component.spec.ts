/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestoComponent } from './testo.component';

describe('TestoComponent', () => {
  let component: TestoComponent;
  let fixture: ComponentFixture<TestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
