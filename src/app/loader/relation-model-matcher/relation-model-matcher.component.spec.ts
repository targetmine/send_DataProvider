import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationModelMatcherComponent } from './relation-model-matcher.component';

describe('RelationModelMatcherComponent', () => {
  let component: RelationModelMatcherComponent;
  let fixture: ComponentFixture<RelationModelMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationModelMatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationModelMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
