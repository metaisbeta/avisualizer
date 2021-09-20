package io.github.phillima.avisualizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


import java.lang.reflect.Method;

@SpringBootApplication
public class AvisualizerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AvisualizerApplication.class, args);
	}

}
