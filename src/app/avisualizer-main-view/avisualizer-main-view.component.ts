import { Component, OnInit } from '@angular/core';
import {SVGUtils} from '../utils/SVGUtils';
@Component({
  selector: 'avisualizer-main-view',
  templateUrl: './avisualizer-main-view.component.html',
  styleUrls: ['./avisualizer-main-view.component.css']
})
export class AvisualizerMainViewComponent implements OnInit {

  isPVHidden: boolean;
  isSVHidden: boolean;
  selectedView: String;

  constructor() { 
    this.isSVHidden = true;
    this.isPVHidden = false;
    this.selectedView = "Package View";	
  }

  ngOnInit(): void {
  }

  selectSystemView(){
    this.isSVHidden = false;
    this.isPVHidden = true;
    SVGUtils.resetSystemView();
  }

  selectPackageView(){
    this.isSVHidden = true;
    this.isPVHidden = false;
    SVGUtils.resetPackageView();
  }
  changeView(){
	if(this.selectedView=="Package View"){
		this.selectedView="System View";
	}else{
		this.selectedView="Package View";
	}
  }


}
