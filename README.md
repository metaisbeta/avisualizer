[![AVisualizer-Actions-Build](https://github.com/phillima/avisualizer/workflows/AVisualizer/badge.svg)](https://github.com/phillima/AVisualizer/actions)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://avisualizer.herokuapp.com/)

<h1 align = "center">Annotation Visualizer</h1>
<h2 align = "center"> A Tool to Visualize Code Annotations Metrics Distribution </h2>

Annotation Metrics
==================

The Annotation Visualizer (AVisualizer) is a software visualization tool that aims to aid researches and developers in analyzing and comprehending code annotations distributions. The visualization is generated based on a suite software metrics dedicated to code annotations.

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

Collecting the Metrics
==================

The collection of the metrics values is performed by the [Annotation Sniffer (ASniffer)](https://github.com/phillima/asniffer). The generated JSON report is used as input for the AVisualizer.


Annotations Visualization
==================

We are proposing three different polymetrics views for code annotations. They are all hierarchical view based on circle packs.

* System View: In this view we are interested in observing how annotation schemas are distributed in the packages. This view has no information of classes.

![System View Example](/images/sv-example.png)
*Example of the System View for a Java Software*

* Package View: In this view we are interested in observing how annotations are distributed inside a class, based on their schema. In this view we have no information of how the annotations are distributed between the code elements.

![Package View Example](/images/pv-example.png)
*Example of the Package View for a Java Software*

* Class View: In this view we group the annotation inside a class based on their code elements.


<h2> Status </h2>
 <p> 🚧 Work In Progress... 🚧</p>
 
<h2> License </h2>
<img alt="GitHub" src="https://img.shields.io/github/license/phillima/avisualizer">
