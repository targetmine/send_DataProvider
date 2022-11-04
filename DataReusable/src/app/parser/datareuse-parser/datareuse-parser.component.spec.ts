import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatareuseParserComponent } from './datareuse-parser.component';

describe('DatareuseParserComponent', () => {
  let component: DatareuseParserComponent;
  let fixture: ComponentFixture<DatareuseParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatareuseParserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatareuseParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
