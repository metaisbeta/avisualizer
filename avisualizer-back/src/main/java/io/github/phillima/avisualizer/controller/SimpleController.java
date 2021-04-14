package io.github.phillima.avisualizer.controller;


import io.github.phillima.avisualizer.model.SimpleResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {

  @RequestMapping("/rest")
  public SimpleResponse index() {
    return new SimpleResponse("Meta is Beta!");
  }
}
