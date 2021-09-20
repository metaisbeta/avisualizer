package io.github.phillima.avisualizer.controller;

import com.github.phillima.asniffer.ASniffer;
import com.github.phillima.asniffer.model.AMReport;
import com.github.phillima.asniffer.output.json.d3hierarchy.JSONReportAvisuIMP;
import com.github.phillima.asniffer.output.json.d3hierarchy.ProjectReport;
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AvisualizerController {

  private AMReport report;
  private ASniffer asniffer;


  @GetMapping("/generate-avisu/")
  public String generate() {
    String projectPath = ""; //onde ta o projeto
    String reportPath = ""; //onde vai jogar os json

    ASniffer aSniffer = new ASniffer(projectPath,reportPath, new JSONReportAvisuIMP());
    AMReport report = asniffer.collectSingle();

    ProjectReport reportSV = new JSONReportSV().prepareJson(report);
    Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
    return jsonBuilder.toJson(reportSV);
  }

}
