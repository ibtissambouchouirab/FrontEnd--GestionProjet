import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import cities from './mock';
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import MoroccoHigh from "@amcharts/amcharts4-geodata/moroccoLow";

import am4geodata_lang_fr from "@amcharts/amcharts4-geodata/lang/FR"; 
import AnimateNumber from 'react-animated-number';
import s from './am4chartMap.module.scss';


import am4geodata_data from "@amcharts/amcharts4-geodata/data/countries2";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  
  class Am4chartMap extends Component {
   
  componentDidMount() {
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.geodataNames = am4geodata_lang_fr;
    map.projection = new am4maps.projections.Miller();
    map.panBehavior = "rotateLongLat";
    map.percentHeight = 90;
    map.dy = 20;
    map.projection = new am4maps.projections.Albers();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: map.colors.getIndex(1).brighten(1),
      max: map.colors.getIndex(1).brighten(-0.3)
    });

    polygonSeries. useGeodata = true;
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.mapPolygons.template.strokeOpacity = 0.5;
    map.homeZoomLevel = 1.2;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'middle';
    map.zoomControl.dy = -10;
    map.zoomControl.contentHeight = 20;
    map.zoomControl.minusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.minusButton.label.fontWeight = 500;
    map.zoomControl.minusButton.label.fontSize = 22;
    map.zoomControl.minusButton.scale = .75;
    map.zoomControl.minusButton.label.scale = .75;
    map.zoomControl.plusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.plusButton.label.fontWeight = 600;
    map.zoomControl.plusButton.label.fontSize = 22;
    map.zoomControl.plusButton.label.align = "center";
    map.zoomControl.plusButton.scale = .75;
    map.zoomControl.plusButton.label.scale = .75;
    map.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
        plusButtonHoverState.properties.fill = am4core.color("#354D84");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
        minusButtonHoverState.properties.fill = am4core.color("#354D84");
    let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
    let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#354D84");

    let linkContainer = map.createChild(am4core.Container);
        linkContainer.isMeasured = false;
        linkContainer.layout = "horizontal";
        linkContainer.x = am4core.percent(50);
        linkContainer.y = am4core.percent(90);
        linkContainer.horizontalCenter = "middle";   
         
    
    this.map = map;
  }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }
  render() {
    return (
      <div className={s.mapChart}>
        <div className={s.stats}>
          <h6 className="mt-1">Morocco</h6>
          <p className="h3 m-0">
            <span className="mr-xs fw-normal">
              <AnimateNumber
                value={1656843}
                initialValue={0}
                duration={1000} 
                stepPrecision={0}
                formatValue={n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              /></span>
            
          </p>
        </div>
        <div className={s.map} id="map">
        </div>
      </div>
    );
  }
}

export default Am4chartMap;
