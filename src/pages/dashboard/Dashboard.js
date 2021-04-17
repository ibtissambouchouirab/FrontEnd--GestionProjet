import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import ChartsA from "../components/charts/ChartsA"
import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";


class Dashboard extends React.Component {

  state = {
    isError: Boolean,
    contacts: [ ],
}

constructor(props){
    super(props);
    fetch('http://localhost:8080/projects')
    .then((res) => { 
       return res.json().then((data) => { this.setState ({isError:false}); this.setState({contacts:data});})
    })
    .catch((error) => {
       console.log("CATCH");
       this.setState ({isError:true});
    })
}

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Dashboard &nbsp;
        </h1>
        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <ChartsA/>
            </Widget>
          </Col>
          <Col lg={1} />

          <Col lg={4}>
            <Widget className="bg-transparent" title={ <h5>{" "} Projets <span className="fw-semi-bold">&nbsp;Statistics</span></h5>} refresh close >
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-tasks" />
                </span>{" "}  &nbsp; {this.state.contacts.length} 3 projets, 20 tasks
              </p>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Projet MTR457</h6>
                  <p className="description deemphasize mb-xs text-white">
                  group H
                  </p>
                  <Progress color="success" value="85" className="bg-custom-dark progress-xs" />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small> <AnimateNumber value={85}/>%</small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Projet MCR983</h6>
                  <p className="description deemphasize mb-xs text-white">
                  group D
                  </p>
                  <Progress color="warning" value="50" className="bg-custom-dark progress-xs"/>
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small><AnimateNumber value={50} />%</small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Projet RPD486</h6>
                  <p className="description deemphasize mb-xs text-white">
                    group B
                  </p>
                  <Progress color="danger" value="25" className="bg-custom-dark progress-xs"/>
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small><AnimateNumber value={25} />%</small>
                  </span>
                </div>
              </div>
            </Widget>
            <Widget
              title={<h6>Calendar</h6>}
              collapse
              close
              bodyClass={"pt-2 px-0 py-0"}
            >
              <Calendar />
              <div className="list-group fs-mini">
              </div>
            </Widget>
          </Col>
          <Col lg={4} >
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
