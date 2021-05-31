import {Component, OnInit} from '@angular/core';
import {AvisualizerService} from './services/avisualizer.service';
import {first, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Inject } from '@angular/core';
import { fileName } from './models/fileNames';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'avisualizer';
  message: string = 'Meta is yet to be Beta';

  constructor(private aVisualizerService: AvisualizerService) {
  	
  }


  ngOnInit(): void {
    // this.aVisualizerService.getWelComeMessage().subscribe(response => this.message = response.message);
    this.aVisualizerService.getWelComeMessage().subscribe(response => this.message = response.message);
  }


}
