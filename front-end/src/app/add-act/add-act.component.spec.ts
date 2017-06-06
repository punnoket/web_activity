/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddActComponent } from './add-act.component';

describe('AddActComponent', () => {
  let component: AddActComponent;
  let fixture: ComponentFixture<AddActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

