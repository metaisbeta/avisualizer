import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avisualizer-main-view',
  templateUrl: './avisualizer-main-view.component.html',
  styleUrls: ['./avisualizer-main-view.component.css']
})
export class AvisualizerMainViewComponent implements OnInit {

  isPVHidden: boolean;
  isSVHidden: boolean;
  constructor() { 
    this.isSVHidden = false;
    this.isPVHidden = true;
  }

  ngOnInit(): void {
  }

  selectSystemView(){
    this.isSVHidden = false;
    this.isPVHidden = true;
  }

  selectPackageView(){
    this.isSVHidden = true;
    this.isPVHidden = false;
  }

}
