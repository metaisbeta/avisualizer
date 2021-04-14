import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisualizerMainViewComponent } from './avisualizer-main-view.component';

describe('AvisualizerMainViewComponent', () => {
  let component: AvisualizerMainViewComponent;
  let fixture: ComponentFixture<AvisualizerMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisualizerMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisualizerMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
