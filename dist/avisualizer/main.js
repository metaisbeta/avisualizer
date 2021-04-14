(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/pppp/Documents/avisualizer/src/main.ts */"zUnb");


/***/ }),

/***/ "7UeH":
/*!******************************************************!*\
  !*** ./src/app/system-view/system-view.component.ts ***!
  \******************************************************/
/*! exports provided: SystemViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemViewComponent", function() { return SystemViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class SystemViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
        this.node = null;
        this.root = null;
    }
    ngOnInit() {
        //read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]("./assets/SpaceWeatherTSI-SV.json").then(data => this.readPackageView(data))
            .catch(error => console.log(error));
    }
    readPackageView(data) {
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        this.root.sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        //Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__["AnnotationSchemas"](this.root, "aa");
        this.schemasMap = anot.getSchemasColorMap();
        //Create the SVG
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createSvg(".svg-container-sv", this.width, this.height, "sistema");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected", String(this.root.data.name));
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("rootName", this.root.data.name);
        //Create the nodes
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createNode(this.svg, this.root);
        //Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        var title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerSV").text() + ": Project " + this.root.data.name;
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerSV").select("h1").text(title);
        //Color all circles
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").selectAll("circle").attr("stroke", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleStroke(d))
            .attr("stroke-dasharray", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleDashArray(d))
            //.attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
            .attr("fill", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].colorCircles(d, this.schemasMap));
        //Apply zoom to all circles in this specific view
        this.svg.selectAll("circle")
            .on("click", (event, d) => {
            if (d.data.type == "schema") {
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.parent.data.name, ".svg-container-sv"), console.log(d.data.type));
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("package-view").attr("hidden", null);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("system-view").attr("hidden", "");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected")), ".svg-container-pv");
            }
            else {
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.data.name, ".svg-container-sv"), console.log(d.data.type));
            }
        })
            .on("mouseover", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createPopUp(d, this.svg, event))
            .on("mouseout", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].destroyPopUp(this.svg))
            .on("mousemove", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].movePopUp(d, this.svg, event))
            .on("contextmenu", (event, d) => {
            event.preventDefault();
            // react on right-clicking
        });
        var packages = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].getPackagesName(this.svg);
        packages.sort();
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv")
            .append("div")
            .attr("class", "nav-bar")
            .style("position", "fixed")
            .style("left", 0 + "px")
            .style("top", 80 + "px")
            .style("background-color", "#fff")
            .style("width", 400)
            .style("overflow", "auto")
            .append("h5").html("Package List: <br/>")
            .append("select").attr("label", "Package List").style("width", "400px");
        for (var i = 0; i < packages.length; i++) {
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("select").append("option")
                .text(packages[i])
                .attr("value", packages[i]);
        }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("select").on("change", (d, i) => {
            _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].highlightNode(".svg-container-sv", String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("select option:checked").text()));
        });
    }
}
SystemViewComponent.ɵfac = function SystemViewComponent_Factory(t) { return new (t || SystemViewComponent)(); };
SystemViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SystemViewComponent, selectors: [["system-view"]], decls: 1, vars: 0, consts: [[1, "svg-container-sv"]], template: function SystemViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeXN0ZW0tdmlldy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "N8JQ":
/*!************************************!*\
  !*** ./src/app/utils/ZoomUtils.ts ***!
  \************************************/
/*! exports provided: ZoomUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomUtils", function() { return ZoomUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ZoomUtils {
    static zoom(event, d, zoomProp, svg, node) {
        if (d.data.type == "annotation" || d.data.type == "schema")
            return;
        zoomProp.focus = d;
        svg.transition()
            .duration(event.altKey ? 7500 : 0)
            .tween("zoom", d => {
            const i = d3__WEBPACK_IMPORTED_MODULE_0__["interpolateZoom"](zoomProp.view, [zoomProp.focus.x, zoomProp.focus.y, zoomProp.focus.r * 2]);
            return t => this.zoomTo(i(t), svg, zoomProp, node);
        });
    }
    static zoomTo(v, svg, zoomProp, node) {
        const k = svg.attr("width") / v[2];
        zoomProp.view = v;
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }
}


/***/ }),

/***/ "S3CC":
/*!********************************************!*\
  !*** ./src/app/utils/AnnotationSchemas.ts ***!
  \********************************************/
/*! exports provided: AnnotationSchemas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationSchemas", function() { return AnnotationSchemas; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


class AnnotationSchemas {
    //root is the root node after running d3.hierarchy
    constructor(root, name) {
        this.schemasColorMap = new Map();
        this.schemasObjectArray = [];
        //obtain a list o schemas
        const schemaSet = new Set();
        if (name == "class") {
            root.descendants().forEach(d => { if (d.data.type == "annotation") {
                schemaSet.add(d.data.properties.schema);
            } });
            console.log("class", schemaSet.size);
        }
        else {
            const schemasNode = root.descendants().filter(d => !lodash__WEBPACK_IMPORTED_MODULE_1__["isEmpty"](d.data.properties));
            console.log(schemasNode.length);
            //To not get repeated schemas
            schemasNode.forEach(d => schemaSet.add(d.data.properties.schema));
            console.log("a", schemaSet.size);
        }
        var cors = ['#1f78b4', '#a6cee3', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#40004b', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];
        var corslight = ['#80b1d3', '#8dd3c7', '#ccebc5', '#b3de69', '#fccde5', '#fb8072', '#fdb462', '#ffffb3', '#9970ab', '#bc80bd', '#ffed6f', '#bebada'];
        //Sort the array with the schemas
        this.schemasOrdered = Array.from(schemaSet);
        this.schemasOrdered.sort();
        this.schemasGroups = [];
        this.schemasTotalAnnotations = new Map();
        //counting total annotations of each schema
        for (var i = 0; i < this.schemasOrdered.length; i++) {
            this.schemasTotalAnnotations.set(this.schemasOrdered[i], 0);
        }
        for (var i = 0; i < root.descendants().length; i++) {
            if (root.descendants()[i].data.type == "annotation") {
                var total = this.schemasTotalAnnotations.get(root.descendants()[i].data.properties.schema);
                var toSum = root.descendants()[i].data.value;
                this.schemasTotalAnnotations.set(root.descendants()[i].data.properties.schema, (total + toSum));
            }
        }
        //build schemas families
        var groupsMap = new Map();
        var colorsArray = [];
        var hexColors = [];
        this.schemasOrdered.forEach((value, i) => {
            var schema = value.split("."); // divide o nome do schema a cada "."
            var family = schema[0] + "." + schema[1]; // junta os dois primeiros termos; ex: org+"."+junit;
            if (groupsMap.has(family)) { // se já existe família; ex: org.springframework
                var elem = groupsMap.get(family); // busca o array de elementos desta família
                elem.push(value); // insere o valor ex: javax.persistence.metamodel na família javax.persistence
                groupsMap.set(family, elem);
            }
            else {
                colorsArray.push(family);
                groupsMap.set(family, [value]);
            }
        });
        const colorArr = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_0__["schemeCategory10"]).domain(colorsArray);
        const coress = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgb"](cors[0], corslight[0])).domain([0, 4]);
        //console.log(d3.color(coress(3)).formatHex());		
        for (let s in colorsArray) {
            //console.log(colorsArray[s]+" "+groupsMap.get(colorsArray[s]).length); 
            const cores = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"]([String(cors[s]), String(corslight[s])])).domain([0, groupsMap.get(colorsArray[s]).length]);
            for (let r = 0; r < groupsMap.get(colorsArray[s]).length; r++) {
                hexColors.push(d3__WEBPACK_IMPORTED_MODULE_0__["color"](cores(r)).formatHex());
            }
        }
        this.schemasOrdered.forEach((value, i) => {
            const myColor = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgb"](cors[i], corslight[i])).domain([0, this.schemasOrdered.length]);
            this.schemasColorMap.set(value, hexColors[i]);
            this.schemasObjectArray.push({ "schema": value, "color": hexColors[i] });
        });
    }
    getSchemasOrdered() {
        return this.schemasOrdered;
    }
    getSchemasColorMap() {
        return this.schemasColorMap;
    }
    getSchemasObjectArray() {
        return this.schemasObjectArray;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./avisualizer-main-view/avisualizer-main-view.component */ "tpbK");


class AppComponent {
    constructor() {
        this.title = 'avisualizer';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "avisualizer-main-view");
    } }, directives: [_avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_1__["AvisualizerMainViewComponent"]], styles: ["h3[_ngcontent-%COMP%] {\n    color: rgb(0, 0, 255);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kscUJBQXFCO0FBQ3pCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDMge1xuICAgIGNvbG9yOiByZ2IoMCwgMCwgMjU1KTtcbn0iXX0= */"] });


/***/ }),

/***/ "XQXR":
/*!********************************************************!*\
  !*** ./src/app/schema-table/schema-table.component.ts ***!
  \********************************************************/
/*! exports provided: SchemaTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemaTableComponent", function() { return SchemaTableComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class SchemaTableComponent {
    constructor() { }
    ngOnInit() { }
    static populateSchemasTable(annotationSchemas) {
        //get the table with schemas
        const schema_table = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table");
        //populate table
        var rows = schema_table.select("tbody").selectAll("tr").
            data(annotationSchemas.getSchemasObjectArray()).enter().append("tr");
        var cells = rows.selectAll("td").data(function (row) {
            return ["schema", "color"].map(function (column) {
                return { column: column, value: row[column] };
            });
        }).enter().append("td")
            .attr("class", d => {
            if (String(d.value).includes("."))
                return "td-schema";
            else
                return "td-color";
        })
            .attr("style", d => {
            if (String(d.value).includes("."))
                return "background-color:#FFFFFF";
            else
                return "background-color:" + d.value;
        })
            .text(d => { if (d.value.includes("."))
            return d.value;
        else
            return ""; });
        //column for total annotations of each schema
        rows.append("td").text(function (d, i) {
            return annotationSchemas.schemasTotalAnnotations.get(annotationSchemas.getSchemasObjectArray()[i].schema);
        });
        //column with checkboxes
        rows.append("input").property('checked', true)
            .attr('type', 'checkbox')
            .attr("id", function (d, i) { return annotationSchemas.getSchemasObjectArray()[i].schema; })
            .on("click", function (d) {
            console.log(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("system-view").attr("hidden"), d3__WEBPACK_IMPORTED_MODULE_0__["select"]("package-view").attr("hidden"), d3__WEBPACK_IMPORTED_MODULE_0__["select"]("class-view").attr("hidden"));
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideCircles(".svg-container-pv", this.id, this.checked);
        });
    }
}
SchemaTableComponent.ɵfac = function SchemaTableComponent_Factory(t) { return new (t || SchemaTableComponent)(); };
SchemaTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SchemaTableComponent, selectors: [["schema-table"]], decls: 11, vars: 0, consts: [["id", "schema-table-container"], ["id", "schemas-table", 1, "table"], [1, "thead-light"]], template: function SchemaTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "thead", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Annotation Schemas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Color");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Total Annotations");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzY2hlbWEtdGFibGUuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./package-view/package-view.component */ "bwui");
/* harmony import */ var _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avisualizer-main-view/avisualizer-main-view.component */ "tpbK");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./schema-table/schema-table.component */ "XQXR");
/* harmony import */ var _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./system-view/system-view.component */ "7UeH");
/* harmony import */ var _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./class-view/class-view.component */ "xIn7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_2__["PackageViewComponent"],
        _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_3__["AvisualizerMainViewComponent"],
        _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_4__["SchemaTableComponent"],
        _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_5__["SystemViewComponent"],
        _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_6__["ClassViewComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "bwui":
/*!********************************************************!*\
  !*** ./src/app/package-view/package-view.component.ts ***!
  \********************************************************/
/*! exports provided: PackageViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PackageViewComponent", function() { return PackageViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schema-table/schema-table.component */ "XQXR");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class PackageViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
    }
    ngOnInit() {
        //read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]("./assets/SpaceWeatherTSI-PV.json").then(data => this.readPackageView(data))
            .catch(error => console.log(error));
    }
    readPackageView(data) {
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        this.root.descendants().forEach(d => {
            d.data.value = d.data.value + 1; //adding 1 to each AA, to avoid 0
        });
        this.root.sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        //Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_2__["AnnotationSchemas"](this.root, "aa");
        this.schemasMap = anot.getSchemasColorMap();
        console.log(this.schemasMap.size);
        //Create the table with Annotation Schemas
        _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_1__["SchemaTableComponent"].populateSchemasTable(anot);
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createSvg(".svg-container-pv", this.width, this.height, "pacote");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected", this.root.data.name);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("rootName", this.root.data.name);
        var title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerPV").text() + ": Project " + this.root.data.name;
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerPV").select("h1").text(title);
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createNode(this.svg, this.root);
        //Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        //Color all circles
        //this.svg.selectAll("circle").each(function(d){if(d.data.type=="annotation")console.log(d.data.value);});	
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("circle").attr("stroke", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].addCircleStroke(d))
            .attr("stroke-dasharray", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].addCircleDashArray(d))
            .attr("fill", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].colorCircles(d, this.schemasMap));
        //Apply zoom to all circles in this specific view
        this.svg.selectAll("circle")
            .on("click", (event, d) => {
            if (d.data.name.includes(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected"))) || d.data.name == String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected"))) {
                if (d.data.type != "class") {
                    this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(String(d.data.type) == "class" ? d.parent.data.name : d.data.name, ".svg-container-pv"));
                }
            }
            else if (d.data.type == "package") {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("system-view").attr("hidden", null);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("package-view").attr("hidden", "");
            }
            else if (d.data.type == "annotation" && d.parent.data.name.includes(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected")))) {
                console.log("annot");
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(String(d.parent.data.name), ".svg-container-pv"));
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("class-view").attr("hidden", null);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("package-view").attr("hidden", "");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-cv");
            }
        })
            .on("mouseover", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createPopUp(d, this.svg, event))
            .on("mouseout", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].destroyPopUp(this.svg))
            .on("mousemove", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].movePopUp(d, this.svg, event))
            .on("contextmenu", (event, d) => {
            var popup = d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv")
                .append("div")
                .attr("class", "popup")
                .style("position", "fixed")
                .style("left", 0 + "px")
                .style("top", 110 + "px")
                .style("background-color", "#fff")
                .style("width", 200)
                .style("overflow", "auto");
            popup.append("h2").text("Testando popup");
            popup.append("p").html("The popUp display" + "<br/>" + d.data.name);
            popup.append("select").append("option").text("aa");
            event.preventDefault();
            // react on right-clicking
        });
    }
}
PackageViewComponent.ɵfac = function PackageViewComponent_Factory(t) { return new (t || PackageViewComponent)(); };
PackageViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PackageViewComponent, selectors: [["package-view"]], decls: 1, vars: 0, consts: [[1, "svg-container-pv"]], template: function PackageViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWNrYWdlLXZpZXcuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "e/6K":
/*!**************************************!*\
  !*** ./src/app/utils/CircleUtils.ts ***!
  \**************************************/
/*! exports provided: CircleUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleUtils", function() { return CircleUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class CircleUtils {
    constructor() { }
    static addCircleStroke(node) {
        if (node.data.type == "package")
            return "black";
        else
            return "blue";
    }
    static addCircleDashArray(node) {
        if (node.data.type == "package")
            return "5,5";
        else
            return null;
    }
    static colorCircles(node, schemasMap) {
        if (node.data.type == "package")
            return "#bdbdbd";
        else if (node.data.type == "annotation")
            return schemasMap.get(node.data.properties.schema);
        //return "url('#green-pattern')";
        else if (node.data.type == "schema")
            return schemasMap.get(node.data.name);
        //return "url('#green-pattern')";
        else if (node.data.type == "method")
            return "#969696";
        else if (node.data.type == "field")
            return "#737373";
        else if (node.data.type == "interface")
            return "#d9d9d9";
        else if (node.data.type == "class")
            return "#525252";
        else
            return "white";
    }
    static highlightNode(container, name) {
        console.log(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode"));
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll("circle").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode"))) {
                console.log(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode"), d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name"));
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "black");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke-width", "1px");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill", "");
            }
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll("circle").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == name) {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode", String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")));
                //console.log(d3.select(this).attr("name")+" "+id+" hide");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "blue");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke-width", "2px");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill", "blue");
            }
        });
    }
}


/***/ }),

/***/ "tOky":
/*!***********************************!*\
  !*** ./src/app/utils/SVGUtils.ts ***!
  \***********************************/
/*! exports provided: SVGUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGUtils", function() { return SVGUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class SVGUtils {
    constructor() { }
    static createSvg(svgContainer, width, height, nome) {
        const svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"](svgContainer)
            .append("svg")
            .attr("viewBox", `-${width / 2} -${(height / 2)} ${width} ${height}`)
            .attr("width", width)
            .attr("height", height)
            .attr("name", nome)
            .attr("highlightedNode", "")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("background", "lightblue")
            .style("cursor", "pointer");
        //.on("click", (event) => this.zoom(event, this.root));
        return svg;
    }
    static createNode(svg, root) {
        const node = svg.append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("circle")
            .attr("class", d => {
            return d.data.type;
        })
            .attr("name", function (d) { return d.data.name; })
            .attr("schema", function (d) { return d.data.type == "annotation" ? d.data.properties.schema : d.data.type; })
            .attr("zoom", "a");
        return node;
    }
    //view related methods
    static viewTransition(origin, view) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](String(view)).selectAll("circle").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == origin) {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch("click");
                SVGUtils.setFocus(origin, view);
                return this;
            }
        });
    }
    static setFocus(toZoom, view) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](String(view)).attr("lastSelected", String(toZoom));
        console.log(view, d3__WEBPACK_IMPORTED_MODULE_0__["select"](String(view)).attr("lastSelected"), "focus");
    }
    static hideCircles(container, id, show) {
        if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("system-view").attr("hidden") !== "") { // hide circles for system-view
            var view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](".svg-container-sv").select("svg");
            view.selectAll("circle").each(function (d, i) {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == id) { //schema se for package name se for system
                    if (!show) {
                        //console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "hidden");
                    }
                    else {
                        //console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "visible");
                    }
                }
            });
        }
        else if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("system-view").attr("hidden") == "" && d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("class-view").attr("hidden") == "") {
            var view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](".svg-container-pv").select("svg");
            view.selectAll("circle").each(function (d, i) {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema")) == id) { //schema se for package name se for system
                    if (!show) {
                        //console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "hidden");
                    }
                    else {
                        //console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "visible");
                    }
                }
            });
        }
        else if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("system-view").attr("hidden") == "" && d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("package-view").attr("hidden") == "") {
            var view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](".svg-container-cv").select("svg");
            view.selectAll("circle").each(function (d, i) {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema")) == id) { //schema se for package name se for system
                    if (!show) {
                        //console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "hidden");
                    }
                    else {
                        //console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "visible");
                    }
                }
            });
        }
    }
    static resetView(viewToUpdate) {
        var view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](String(viewToUpdate)).select("svg");
        view.selectAll("circle").each(function (d, i) {
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("visibility", "visible");
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("input").property('checked', true);
    }
    //popUp methods
    static createPopUp(d, svg, event) {
        if (d.data.type == "schema") { //system view
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 1)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 70) + "px")
                .style("background", "#BCC5F7")
                .html("Schema Name: " + d.data.name + "<br/>" + "Package Name " + d.parent.data.name + "<br/>" + "Number of Annotations: " + d.data.size)
                .transition()
                .duration(200);
        }
        else if (d.data.type == "annotation" && d.parent.data.type == "class") { // package view
            var classname = d.parent.data.name.split(".");
            console.log("class but showing package", d.parent.data.type);
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 1)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 60) + "px")
                .style("background", "#BCC5F7")
                .html("Package Name: " + d.parent.parent.data.name + "<br/>" + "Class Name " + classname[classname.length - 1] + "<br/>" + "Annotation name: " + d.data.name + "<br/>" + "AA: " + d.data.value)
                .transition()
                .duration(200);
        }
        else if (d.data.type == "annotation" && ((d.parent.data.type == "field" || d.parent.data.type == "method") || d.parent.data.type == "interface")) { // package view
            var componentname = d.parent.data.name.split(".");
            var classname = d.parent.parent.data.name.split(".");
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 1)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 60) + "px")
                .style("background", "#BCC5F7")
                .html("Package Name: " + d.parent.parent.parent.data.name + "<br/>" + "Class Name: " + classname[classname.length - 1] + "<br/>" + d.parent.data.type + " Name " + componentname[componentname.length - 1] + "<br/>" + "Annotation name: " + d.data.name + "<br/>" + "AA: " + d.data.properties.aa)
                .transition()
                .duration(200);
        }
    }
    static destroyPopUp(svg) {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](".tooltip").remove();
    }
    static movePopUp(d, svg, event) {
        SVGUtils.destroyPopUp(svg);
        SVGUtils.createPopUp(d, svg, event);
    }
    static getPackagesName(svg) {
        var names = [];
        svg.selectAll("circle").each(d => {
            if (d.data.type == "package" && d.data.children.length > 0) {
                names.push(d.data.name);
            }
        });
        return names;
    }
}


/***/ }),

/***/ "tpbK":
/*!**************************************************************************!*\
  !*** ./src/app/avisualizer-main-view/avisualizer-main-view.component.ts ***!
  \**************************************************************************/
/*! exports provided: AvisualizerMainViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvisualizerMainViewComponent", function() { return AvisualizerMainViewComponent; });
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../system-view/system-view.component */ "7UeH");
/* harmony import */ var _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../package-view/package-view.component */ "bwui");
/* harmony import */ var _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../class-view/class-view.component */ "xIn7");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schema-table/schema-table.component */ "XQXR");







class AvisualizerMainViewComponent {
    constructor() {
        this.isSVHidden = false;
        this.isPVHidden = true;
        this.isCVHidden = true;
        this.selectedView = "Package";
    }
    ngOnInit() {
    }
    selectSystemView() {
        this.isSVHidden = false;
        this.isPVHidden = true;
        this.isCVHidden = true;
        //reset workspace on change. SHOULD NOT BE IT!!!!!
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-sv");
        //transition between zoomed views
        if (!(this.selectedView == "System")) {
            if (this.selectedView == "Package")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-sv");
            else {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-cv").attr("lastSelected")), ".svg-container-sv");
            }
        }
        this.selectedView = "System";
    }
    selectPackageView() {
        this.isSVHidden = true;
        this.isPVHidden = false;
        this.isCVHidden = true;
        //reset workspace on change. SHOULD NOT BE IT!!!!!
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-pv");
        //transition between zoomed views
        console.log(this.isSVHidden, this.isPVHidden);
        if (!(this.selectedView == "Package")) {
            if (this.selectedView == "System")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-sv").attr("lastSelected")), ".svg-container-pv");
            else
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-cv").attr("lastSelected")), ".svg-container-pv");
        }
        this.selectedView = "Package";
    }
    selectClassView() {
        this.isSVHidden = true;
        this.isPVHidden = true;
        this.isCVHidden = false;
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-cv");
        if (!(this.selectedView == "Class")) {
            if (this.selectedView == "System")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-sv").attr("lastSelected")), ".svg-container-cv");
            else
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-cv");
        }
        this.selectedView = "Class";
    }
}
AvisualizerMainViewComponent.ɵfac = function AvisualizerMainViewComponent_Factory(t) { return new (t || AvisualizerMainViewComponent)(); };
AvisualizerMainViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AvisualizerMainViewComponent, selectors: [["avisualizer-main-view"]], decls: 18, vars: 6, consts: [["id", "headerSV", 3, "hidden"], ["id", "headerPV", 3, "hidden"], ["id", "headerCV", 3, "hidden"], [1, "container-fluid"], [1, "row"], ["id", "navigation", 1, "col-sm"], [1, "col-sm"], [3, "hidden"]], template: function AvisualizerMainViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Annotation Visualizer - System View ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Annotation Visualizer - Package View ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Annotation Visualizer - Class View ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "system-view", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "package-view", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "class-view", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "schema-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isSVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isPVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isCVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isSVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isPVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isCVHidden);
    } }, directives: [_system_view_system_view_component__WEBPACK_IMPORTED_MODULE_3__["SystemViewComponent"], _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_4__["PackageViewComponent"], _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_5__["ClassViewComponent"], _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_6__["SchemaTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmlzdWFsaXplci1tYWluLXZpZXcuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "xIn7":
/*!****************************************************!*\
  !*** ./src/app/class-view/class-view.component.ts ***!
  \****************************************************/
/*! exports provided: ClassViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassViewComponent", function() { return ClassViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class ClassViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
        this.zoomProp_locad = {};
    }
    ngOnInit() {
        //read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]("./assets/SpaceWeatherTSI-CV.json").then(data => this.readPackageView(data))
            .catch(error => console.log(error));
    }
    readPackageView(data) {
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        this.root.descendants().forEach(d => {
            d.data.value = d.data.value + 1; //adding 1 to each AA, to avoid 0
        });
        this.root.sum(d => { d.value; if (d.type == "annotation")
            d.value = parseInt(d.properties.aa) + 1;
        else if (Number.isNaN(d.value))
            d.value = 0; })
            .sort((a, b) => { b.value - a.value; });
        this.root.sum(d => d.value);
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        //Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__["AnnotationSchemas"](this.root, "class");
        this.schemasMap = anot.getSchemasColorMap();
        //Create the SVG
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createSvg(".svg-container-cv", this.width, this.height, "classe");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").attr("lastSelected", String(this.root.data.name));
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").attr("rootName", this.root.data.name);
        //Create the nodes
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createNode(this.svg, this.root);
        //Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        var title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerCV").text() + ": Project " + this.root.data.name;
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#headerCV").select("h1").text(title);
        //Color all circles
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("circle").attr("stroke", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleStroke(d))
            .attr("stroke-dasharray", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleDashArray(d))
            //.attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
            .attr("fill", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].colorCircles(d, this.schemasMap));
        //Apply zoom to all circles in this specific view
        this.svg.selectAll("circle")
            .on("click", (event, d) => {
            if (d.data.type == "package") {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("package-view").attr("hidden", null);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("class-view").attr("hidden", "");
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.parent.data.name, ".svg-container-pv"));
            }
            else
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.data.name, ".svg-container-cv"));
        })
            .on("mouseover", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createPopUp(d, this.svg, event))
            .on("mouseout", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].destroyPopUp(this.svg))
            .on("mousemove", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].movePopUp(d, this.svg, event))
            .on("contextmenu", function (event) {
            var popup = d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv")
                .append("div")
                .attr("class", "popup")
                .style("position", "fixed")
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")
                .style("background-color", "#fff")
                .style("width", 200)
                .style("overflow", "auto");
            popup.append("h2").text("Testando popup");
            popup.append("p").html("The popUp display" + "<br/>");
            popup.append("select").append("option").text("aa");
            event.preventDefault();
            // react on right-clicking
        });
    }
}
ClassViewComponent.ɵfac = function ClassViewComponent_Factory(t) { return new (t || ClassViewComponent)(); };
ClassViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: ClassViewComponent, selectors: [["class-view"]], decls: 1, vars: 0, consts: [[1, "svg-container-cv"]], template: function ClassViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjbGFzcy12aWV3LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map