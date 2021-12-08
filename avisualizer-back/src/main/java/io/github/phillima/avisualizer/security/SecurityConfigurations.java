package io.github.phillima.avisualizer.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfigurations {
  @Bean
  public CorsFilter corsFilter() {
      CorsConfiguration corsConfig = new CorsConfiguration();
      corsConfig.setAllowCredentials(true);
      corsConfig.addAllowedHeader("*");
      corsConfig.addAllowedMethod("*");
      corsConfig.setMaxAge(3600L);
      corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfig);

      return new CorsFilter(source);
  }
}