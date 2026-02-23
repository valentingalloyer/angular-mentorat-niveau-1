import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex1 } from './ex1';

describe('Ex1', () => {
  let component: Ex1;
  let fixture: ComponentFixture<Ex1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
