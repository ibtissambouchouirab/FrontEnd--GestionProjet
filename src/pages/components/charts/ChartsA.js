import React from "react";

import { Row, Col } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import ApexChart from "react-apexcharts";

import s from "./Charts.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mockA";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

class ChartsA extends React.Component {
  state = {
    cd: chartData,
    ld: liveChart,
    initEchartsOptions: {
      renderer: "canvas",
    },
    sparklineData: {
      series: [{ data: [1, 7, 3, 5, 7, 8] }],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "70%",
          },
        },
      },
    },
  };

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.state;
    return (
      <div className={s.root}>
        <h1 className="page-title"> <span className="fw-semi-bold">Chart</span></h1>
        <div>
          <Row>
            <Col>
              <Widget title={ <h5> <span className="fw-semi-bold">Column Chart</span></h5>}close collapse  refresh>
                <ApexChart
                  className="sparkline-chart"
                  height={350}
                  series={cd.apex.column.series}
                  options={cd.apex.column.options}
                  type={"bar"}
                />
              </Widget>
            </Col>
            <Col lg={12} xs={12}>
                  <Widget  title={<h5> <span className="fw-semi-bold">Live Chart</span></h5>}close collapse refresh>
                    <HighchartsReact options={ld} />
                  </Widget>
                </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ChartsA;
