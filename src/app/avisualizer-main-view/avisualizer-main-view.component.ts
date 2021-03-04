import { Component, OnInit } from '@angular/core';
import {SVGUtils} from '../utils/SVGUtils';
import { PackageViewComponent } from '../package-view/package-view.component';
import * as d3 from 'd3';
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
    this.selectedView = "Package";	
  }

  ngOnInit(): void {
  }

  selectSystemView(){
    this.isSVHidden = false;
    this.isPVHidden = true;
    //reset workspace on change. SHOULD NOT BE IT!!!!!
    SVGUtils.resetView(".svg-container-sv");
    //transition between zoomed views
    
    if(!(this.selectedView=="System")){
	SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-sv"); 
    }
    this.selectedView="System";
  }

  selectPackageView(){
    this.isSVHidden = true;
    this.isPVHidden = false;
    //reset workspace on change. SHOULD NOT BE IT!!!!!
    SVGUtils.resetView(".svg-container-pv");
    //transition between zoomed views
    console.log(this.isSVHidden,this.isPVHidden);
    if(!(this.selectedView=="Package")){
    	SVGUtils.viewTransition(String(d3.select(".svg-container-sv").attr("lastSelected")),".svg-container-pv");
    }
    this.selectedView="Package";	
  }
   
}
