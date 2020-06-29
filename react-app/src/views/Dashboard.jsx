
import React, {Component } from "react";
import axios from 'axios';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import logo1 from './wind.jpg';
import logo2 from './H2.jpg';
import graph from './graph.png';
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  hydPred
} from "variables/Variables.jsx";

class Dashboard extends Component {
  

  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
	  hydVar: null,
	  isLoading: true
	
    };
  }
  
  

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
    
}


async getFetch() {
  let url = 'http://api.eia.gov/series/?api_key=2178a1e50f61a4aa4c1c11c1b7b83169&series_id=TOTAL.DFONUUS.A'
  console.log("url " + url)
        
      const fetchResult = fetch(url)
      console.log(fetchResult);
      const response = await fetchResult;
      const jsonData = await response.json();
      console.log(jsonData);

      

  }
  
   componentDidMount() {
    /* axios.get(`http://localhost:5000`)
      .then(res => {
 		this.setState({
        hydVar: res.data.hydrogen + ' Kg',
        isLoading: false,
      })
      } ) */
  }
  
  
  
  render() {
	//  const { isLoading, hydVar} = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                 bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Wind Power"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                bigIcon={<img src = {graph} height={60} width={60} />}
                statsText="Projection"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img src = {logo2} height={60} width={60} />}                
                statsText="Prediction"
                statsValue={this.state.hydVar} 
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img src = {logo1} height={60} width={60} />}
                statsText="Wind energy"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            </Row>
          <Row>
            <Col md={8}>
              <StatsCard
                bigIcon={<img src = {graph} height={300} width={600} />}
                statsText="Wind Power Projection"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="as of 07/09"
              />
            </Col>
            
          </Row>

        </Grid>

      </div>
    );
  }
}

export default Dashboard;
