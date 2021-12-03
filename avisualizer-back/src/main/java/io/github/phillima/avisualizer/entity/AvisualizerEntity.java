package io.github.phillima.avisualizer.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("avisualizer")
public class AvisualizerEntity {

    @Id
    private UUID id;
    private String name;

    private String cv;
    private String pv;
    private String sv;

    private LocalDateTime last_update;

}
