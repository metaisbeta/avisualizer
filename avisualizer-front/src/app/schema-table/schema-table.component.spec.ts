import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTableComponent } from './schema-table.component';

describe('SchemaTableComponent', () => {
  let component: SchemaTableComponent;
  let fixture: ComponentFixture<SchemaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
