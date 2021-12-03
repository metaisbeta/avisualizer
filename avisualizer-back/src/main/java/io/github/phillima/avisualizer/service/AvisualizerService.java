package io.github.phillima.avisualizer.service;

import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV;
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV;
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.github.phillima.avisualizer.entity.AvisualizerEntity;
import io.github.phillima.avisualizer.model.AvisualizerModel;
import io.github.phillima.avisualizer.repository.AvisualizerRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class AvisualizerService {

    @Autowired
    private AvisualizerRepository repository;

    private static final String CV_DEFAULT = "SpaceWeatherTSI-CV.json";
    private static final String PV_DEFAULT = "SpaceWeatherTSI-PV.json";
    private static final String SV_DEFAULT = "SpaceWeatherTSI-SV.json";

    private static final String DEFAULT_NAME = "SpaceWeatherTSI";

    private static final String NO_PARAM = "";


    private AvisualizerModel currentModel = standardResponse();

    public AvisualizerService() throws URISyntaxException, IOException {
    }

    public AvisualizerModel standardResponse() throws URISyntaxException, IOException {
        String cv = readCVFileFromResources(CV_DEFAULT);
        String pv = readCVFileFromResources(PV_DEFAULT);
        String sv = readCVFileFromResources(SV_DEFAULT);

        return new AvisualizerModel(DEFAULT_NAME, cv, pv, sv);
    }

    public String returnFileSV(String fileName) throws URISyntaxException, IOException {
        return readSVFileFromResources(fileName);
    }

    public String returnFileCV(String fileName) throws URISyntaxException, IOException {
        return readCVFileFromResources(fileName);
    }

    public String returnFilePV(String fileName) throws URISyntaxException, IOException {
        return readPVFileFromResources(fileName);
    }

    public static String readSVFileFromResources(String filename) throws URISyntaxException, IOException {
        URL resource = AvisualizerService.class.getClassLoader().getResource(filename);
        byte[] bytes = Files.readAllBytes(Paths.get(resource.toURI()));
        return new String(bytes);
    }

    public static String readPVFileFromResources(String filename) throws URISyntaxException, IOException {
        URL resource = AvisualizerService.class.getClassLoader().getResource(filename);
        byte[] bytes = Files.readAllBytes(Paths.get(resource.toURI()));
        return new String(bytes);
    }

    public static String readCVFileFromResources(String filename) throws URISyntaxException, IOException {
        URL resource = AvisualizerService.class.getClassLoader().getResource(filename);
        byte[] bytes = Files.readAllBytes(Paths.get(resource.toURI()));
        return new String(bytes);
    }

    public String returnSV(String projectID) throws URISyntaxException, IOException {
        if(StringUtils.isEmpty(projectID)){
            return returnFileSV(SV_DEFAULT);
        }
        Optional<AvisualizerEntity> response= this.repository.findById(UUID.fromString(projectID));
        if(response.isPresent()){
            return response.get().getSv();
        }
        return "";
    }

    public String returnCV(String projectID) throws URISyntaxException, IOException {
        if(StringUtils.isEmpty(projectID)){
            return returnFileSV(SV_DEFAULT);
        }
        Optional<AvisualizerEntity> response= this.repository.findById(UUID.fromString(projectID));
        if(response.isPresent()){
            return response.get().getCv();
        }
        return "";
    }

    public String returnPV(String projectID) throws URISyntaxException, IOException {
        if(StringUtils.isEmpty(projectID)){
            return returnFileSV(SV_DEFAULT);
        }
        Optional<AvisualizerEntity> response= this.repository.findById(UUID.fromString(projectID));
        if(response.isPresent()){
            return response.get().getPv();
        }
        return "";
    }

    public AvisualizerEntity saveModel(AvisualizerModel model){
        AvisualizerEntity entity = new AvisualizerEntity();
        entity.setId(UUID.randomUUID());
        entity.setName(model.getName());

        entity.setCv(model.getCv());
        entity.setSv(model.getSv());
        entity.setPv(model.getPv());

        entity.setLast_update(LocalDateTime.now());

        return this.repository.save(entity);
    }

    public AvisualizerEntity getAllInformation(String projectUUID) throws URISyntaxException, IOException {
        Optional<AvisualizerEntity> response = this.repository.findById(UUID.fromString(projectUUID));
        if(response.isPresent()){
            return response.get();
        }
        return new AvisualizerEntity();
    }

    private Long processProjectID(Long projectID){
        if(Objects.isNull(projectID)){
            return -1L;
        }
        return projectID;
    }

}
