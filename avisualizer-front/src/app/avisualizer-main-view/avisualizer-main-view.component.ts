import { Component, OnInit } from '@angular/core';
import {SVGUtils} from '../utils/SVGUtils';
import * as d3 from 'd3';
import {HttpClient} from '@angular/common/http';
import { fileName } from '../models/fileNames';
import {  HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SystemViewComponent } from '../system-view/system-view.component';
import { ClassViewComponent } from '../class-view/class-view.component';
import { PackageViewComponent } from '../package-view/package-view.component';
import { NgxSpinnerService } from "ngx-spinner";
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
  readonly apiURL : string;
  uploadForm: FormGroup;
  constructor(private http : HttpClient, private spinner: NgxSpinnerService) {
    this.isSVHidden = false;
    this.isPVHidden = true;
    this.isCVHidden = true;
    this.isCVHidden = true;
    this.selectedView = 'Package';
    this.apiURL  = 'http://localhost:8000'; 	
  }

  ngOnInit(): void {
  var formBuilder:FormBuilder;
  formBuilder=new FormBuilder();
     this.uploadForm = formBuilder.group({
      profile: ['']
    });
  	d3.select("#SelectViewBox").append("select").attr("id","projectSelectBox").append("option").text("Select Project");
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  async onSubmit() {
 
   this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    await this.http.post(this.apiURL+'/asniffer', formData,{responseType: 'text'}).subscribe(
      (res) => d3.select("ngx-spinner").style('visibility', 'hidden'),
      (err) => console.log(err),
      
    );
  }



	listProjects() {
this.http.get(this.apiURL+'/projects',
    {responseType: 'text'})
           .subscribe(resultado =>{ 
           console.log(resultado)
           	d3.select("#projectSelectBox").selectAll("option").remove();
           	d3.select("#projectSelectBox").append("option").text("Select Project");
           	var options = resultado.split(",");
//           	for(var key in options){
//           		options.push(String(resultado[key].name)); 
//           		          		            			    
//        	} 
        	for(var i=0;i<options.length;i++){
           		
            		d3.select("#projectSelectBox").append("option")
           			.text(options[i])
                     		.attr("value",options[i])
                     		
            		            			    
        	} 
        	d3.select("#projectSelectBox")
        		.on("change",(event,d)=>{this.getProject(d3.select("#projectSelectBox").select("select option:checked").attr("value"))});
                });
	}
	getProject(file:string){
//		console.log(this.apiURL+'/projects/'+file+"/"+file+"-SV.json")
//		this.http.get(this.apiURL+'/'+file+"/"+file+"-SV.json")
//		.subscribe(resultado => console.log(resultado));	
		d3.select(".svg-container-sv").selectAll("*").remove();
		d3.select("tbody").selectAll("*").remove();
		d3.select(".svg-container-pv").selectAll("*").remove();
		d3.select(".svg-container-cv").selectAll("*").remove();
		new SystemViewComponent(this.http);
		//new ClassViewComponent(this.http);
		//new PackageViewComponent(this.http);
	}


  selectSystemView(){
    this.isSVHidden = false;
    this.isPVHidden = true;
    this.isCVHidden = true;


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
