package io.github.phillima.avisualizer.controller;


import io.github.phillima.avisualizer.entity.AvisualizerEntity;
import io.github.phillima.avisualizer.model.AvisualizerModel;
import io.github.phillima.avisualizer.model.SimpleResponse;
import io.github.phillima.avisualizer.service.AvisualizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;

@CrossOrigin
@RestController
public class Controller {

    @Autowired
    private AvisualizerService avisualizerService;

    @RequestMapping("/rest")
    public SimpleResponse index() {
        return new SimpleResponse("Meta is Beta!");
    }

    @RequestMapping("/data.json")
    public ResponseEntity<AvisualizerEntity> returnAllData(@RequestParam(required = false, name = "project") String project) throws URISyntaxException, IOException {
        AvisualizerEntity response = avisualizerService.getAllInformation(project);
        return ResponseEntity.ok(response);
    }

    @RequestMapping("/data/sv.json")
    public String returnSv(@RequestParam(required = false, name = "project") String project) throws URISyntaxException, IOException {
        return avisualizerService.returnSV(project);
    }

    @RequestMapping("/data/pv.json")
    public String returnPV(@RequestParam(required = false, name = "project") String project) throws URISyntaxException, IOException {
        return avisualizerService.returnPV(project);
    }

    @RequestMapping("/data/cv.json")
    public String returnCV(@RequestParam(required = false, name = "project") String project) throws URISyntaxException, IOException {
        return avisualizerService.returnCV(project);
    }

    @PostMapping("/data/save")
    public ResponseEntity<AvisualizerEntity> saveData(@RequestBody AvisualizerModel model) {
        AvisualizerEntity resp = avisualizerService.saveModel(model);
        return ResponseEntity.ok(resp);
    }

}
