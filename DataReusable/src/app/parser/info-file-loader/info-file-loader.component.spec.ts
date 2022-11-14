import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFileLoaderComponent } from './info-file-loader.component';

describe('InfoFileLoaderComponent', () => {
  let component: InfoFileLoaderComponent;
  let fixture: ComponentFixture<InfoFileLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFileLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
