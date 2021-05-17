import { Component, OnInit } from '@angular/core';
import {SVGUtils} from '../utils/SVGUtils';
import * as d3 from 'd3';
@Component({
  selector: 'avisualizer-main-view',
  templateUrl: './avisualizer-main-view.component.html',
  styleUrls: ['./avisualizer-main-view.component.css']
})
export class AvisualizerMainViewComponent implements OnInit {

  isPVHidden: boolean;
  isSVHidden: boolean;
  isCVHidden: boolean;
  isCVANLHidden: boolean;
  selectedView: string;
  initialViewName = 'System View';

  constructor() {
    this.isSVHidden = false;
    this.isPVHidden = true;
    this.isCVHidden = true;
    this.isCVHidden = true;
    this.selectedView = 'Package';

  }

  ngOnInit(): void {
  }

  selectSystemView(){
    this.isSVHidden = false;
    this.isPVHidden = true;
    this.isCVHidden = true;

    //reset workspace on change. SHOULD NOT BE IT!!!!!
    SVGUtils.resetView(".svg-container-sv");
    //transition between zoomed views

    if(!(this.selectedView=="System")){
      if(this.selectedView=="Package")
        SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-sv");
      else{
        SVGUtils.viewTransition(String(d3.select(".svg-container-cv").attr("lastSelected")),".svg-container-sv");
      }
    }
    this.selectedView="System";
    this.initialViewName = 'System View';
  }

  selectPackageView(){
    this.isSVHidden = true;
    this.isPVHidden = false;
    this.isCVHidden = true;

    //reset workspace on change. SHOULD NOT BE IT!!!!!
    SVGUtils.resetView(".svg-container-pv");
    //transition between zoomed views
    console.log(this.isSVHidden,this.isPVHidden);
    if(!(this.selectedView=="Package")){
	if(this.selectedView=="System")
    		SVGUtils.viewTransition(String(d3.select(".svg-container-sv").attr("lastSelected")),".svg-container-pv");
    	else
     		SVGUtils.viewTransition(String(d3.select(".svg-container-cv").attr("lastSelected")),".svg-container-pv");
    }
    this.selectedView="Package";
    this.initialViewName = 'Package View';
  }
  selectClassView(){
    this.isSVHidden = true;
    this.isPVHidden = true;
    this.isCVHidden = false;
    SVGUtils.resetView(".svg-container-cv");
    if(!(this.selectedView=="Class")){
    	if(this.selectedView=="System")
    		SVGUtils.viewTransition(String(d3.select(".svg-container-sv").attr("lastSelected")),".svg-container-cv");
    	else
     		SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-cv");
    }
    this.selectedView="Class";
    this.initialViewName = 'Class View';
 }


 selectViewHandler(view: any){
    // update view
    if (view.target.value === 'systemView') {
      this.selectSystemView();
    }else if (view.target.value === 'packageView') {
      this.selectPackageView();
    }else{
    	this.selectClassView();
    }
  }
}
