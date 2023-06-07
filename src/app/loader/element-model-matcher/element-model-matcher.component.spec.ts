import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementModelMatcherComponent } from './element-model-matcher.component';

describe('ElementModelMatcherComponent', () => {
  let component: ElementModelMatcherComponent;
  let fixture: ComponentFixture<ElementModelMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementModelMatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementModelMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
