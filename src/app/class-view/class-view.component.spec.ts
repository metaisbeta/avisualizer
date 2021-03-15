import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassViewComponent } from './class-view.component';

describe('ClassViewComponent', () => {
  let component: ClassViewComponent;
  let fixture: ComponentFixture<ClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
