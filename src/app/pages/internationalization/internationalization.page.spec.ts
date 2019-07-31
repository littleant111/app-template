import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationPage } from './internationalization.page';

describe('InternationalizationPage', () => {
  let component: InternationalizationPage;
  let fixture: ComponentFixture<InternationalizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalizationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
