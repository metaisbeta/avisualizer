package io.github.phillima.avisualizer.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import com.github.phillima.asniffer.ASniffer;
import com.github.phillima.asniffer.model.AMReport;
import com.github.phillima.asniffer.output.json.d3hierarchy.JSONReportAvisuIMP;
import com.github.phillima.asniffer.output.json.d3hierarchy.ProjectReport;
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV;
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV;
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.*;

@RestController
public class ASnifferController {

    @GetMapping("/avisualizer")
    @ResponseBody
    public String getProjectsReportAVisualzer(@RequestParam String projectRepoURL){

        String currentUserDirectory = Paths.get("")
                        .toAbsolutePath()
                        .toString();
        String tempProject = currentUserDirectory + File.separator + "test";
        cloneRepository(tempProject,projectRepoURL);

        ASniffer aSniffer = new ASniffer(tempProject,tempProject);

        AMReport report = aSniffer.collectSingle();

        ProjectReport[] projectReports = new ProjectReport[3];
        projectReports[0] = new JSONReportSV().prepareJson(report);
        projectReports[1] = new JSONReportPV().prepareJson(report);
        projectReports[2] = new JSONReportCV().prepareJson(report);


        try {
            FileSystemUtils.deleteRecursively(Paths.get(tempProject));
        } catch (IOException e) {
            e.printStackTrace();
        }

        Gson json = new GsonBuilder().setPrettyPrinting().create();

        String jsonReturn = json.toJson(projectReports);

        return jsonReturn;

    }


    private void cloneRepository(String tempProject, String gitHubUrl){

        if(Files.isDirectory(Paths.get(tempProject))){
            System.out.println("Already Collected!");
        }else{
            try {
                Git.cloneRepository()
                        .setURI(gitHubUrl)
                        .setDirectory(Paths.get(tempProject).toFile())
                        .call();
            } catch (GitAPIException e) {
                e.printStackTrace();
            }
        }
    }
}
