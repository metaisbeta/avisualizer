package io.github.phillima.avisualizer.controller;

import com.github.phillima.asniffer.ASniffer;
import com.github.phillima.asniffer.model.AMReport;
import com.github.phillima.asniffer.output.json.d3hierarchy.JSONReportAvisuIMP;
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV;
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV;
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.github.phillima.avisualizer.model.ProjectModel;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AvisualizerController {

  private String projectPath = "/home/phillima/Documentos/Doutorado/Embrace/repositorios/SpaceWeatherTSI/";
  private String reportPath = "/home/phillima/Documentos/IdeaProjects/avisualizer/avisu-front/src/assets";
//  private AMReport report;
//  private ASniffer asniffer;


  //private AMReport report;
//
//  @GetMapping("/generate-avisu/system-view")
//  public String fetchSV(){
//    Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
//    String json = gson.toJson(new JSONReportSV().prepareJson(new ASniffer(projectPath,projectPath).collectSingle()));
//    return json;
//
//  }
//
//  @GetMapping("/generate-visu/package-view")
//  public String fetchPV(){
//    Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
//    String json = gson.toJson(new JSONReportPV().prepareJson(this.report));
//    return json;
//
//  }
//
//  @GetMapping("/generate-visu/class-view")
//  public String fetchCV(){
//    Gson gson = (new GsonBuilder()).setPrettyPrinting().create();
//    String json = gson.toJson(new JSONReportCV().prepareJson(this.report));
//    return json;
//  }
//
//
//  @PostMapping("/generate-avisu")
//  public ProjectModel generateReport(@RequestBody ProjectModel projectModel){
//    asniffer = new ASniffer(projectModel.getPath(),projectModel.getReportPath(),new JSONReportAvisuIMP());
//    asniffer.collectSingle();
//    return new ProjectModel();
//  }

}
