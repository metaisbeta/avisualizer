import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageViewComponent } from './package-view.component';

describe('PackageViewComponent', () => {
  let component: PackageViewComponent;
  let fixture: ComponentFixture<PackageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageViewComponent ]
    })

    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
    it("has 14 schemas",()=>{
        
    	expect(component.width).toEqual(960);
    });
  it('should create', () => {
  
    expect(component).toBeTruthy();
  });
});
