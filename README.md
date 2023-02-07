[![AVisualizer](https://github.com/metaisbeta/avisualizer/actions/workflows/main.yml/badge.svg)](https://github.com/metaisbeta/avisualizer/actions/workflows/main.yml)
[![Heroku](https://img.shields.io/badge/heroku-deployed-blueviolet.svg?logo=heroku&)](https://avisualizer.herokuapp.com/)

<h1 align = "center">Annotation Visualizer</h1>
<h2 align = "center"> A Tool to Visualize Code Annotations Metrics Distribution </h2>


The Annotation Visualizer (AVisualizer) is a software visualization tool that aims to aid researches and developers in analyzing and comprehending code annotations distributions. This tool was used to support our research paper [CADV - Code Annotations Distribution Visualization](https://www.sciencedirect.com/science/article/abs/pii/S0950584922001987).

Code Annotation Metrics
=======================

The visualization is generated based on a suite software metrics dedicated to code annotations.

The suite is composed of 9 metrics proposed and defined in the the paper [A Metrics Suite for Code Annoation Assessment](https://www.sciencedirect.com/science/article/pii/S016412121730273X)

### Code Annotation Metrics 

* AC: Annotations in Class
* UAC: Unique Annotations in Class
* ASC: Annotation Schema in Class
* AED: Annotation in Element Declaration
* AA: Attributes in Annotation
* ANL: Annotation Nesting Level
* LOCAD: LOC in Annotation Declaration
* NEC: Number of Elements in Class
* NAEC: Number of Annotated Elements in Class


Basic Building Blocks
=======================

![Building Blocks](/images/avisualizer-blocks.png)
*Basic Building Blocks of AVisualizer*

The backend of AVisualizer is mostly concernd with extracting the metrics values and serving the frontend. The extraction of the metrics values is performed by the [Annotation Sniffer (ASniffer)](https://github.com/phillima/asniffer). The generated JSON report is used as input for the AVisualizer frontend.

The frontend of AVisualizer is build using the React library [React Library](https://reactjs.org) and [D3.js](https://d3js.org).


Annotations Visualization
==================

We are proposing three different polymetrics views for code annotations. They are all hierarchical view based on circle packs.

* System View: In this view we are interested in observing how annotation schemas are distributed in the packages. This view has no information of classes.

![System View Example](/images/avisualizer-sv.png)
*Example of the System View for a Java Software*

* Package View: In this view we are interested in observing how annotations are distributed inside a class, based on their schema. In this view we have no information of how the annotations are distributed between the code elements.

![Package View Example](/images/avisualizer-pv.png)
*Example of the Package View for a Java Software*

![Class View Example](/images/avisualizer-pv.png)
* Class View: In this view we group the annotation inside a class based on their code elements.


Executing AVisualizer
==================

The first step is to build the application using Maven


```
mvn clean package
```
The executable jar file will be located in the folder ```avisualizer-back/target```.

Run it with the command

```
java -jar avisualizer-back/target/avisualizer-back.jar
```
The application will available on ```http://localhost:8080```
 
<h2> License </h2>
<img alt="GitHub" src="https://img.shields.io/github/license/phillima/avisualizer">
