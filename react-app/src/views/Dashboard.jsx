
import React, {Component } from "react";
import axios from 'axios';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import logo1 from './wind.jpg';
import logo2 from './H2.jpg';
import price1 from './price.jpg';
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
  legendBar

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
    axios.get(`https://windpowergreenhydrogen.eu-gb.cf.appdomain.cloud/api/WindpredMonth`)
      .then(res => {
		this.setState({
        hydVar: Math.floor(res.data.power_excess_forhydrogen / 48) ,
		
		monthPred: res.data.data[0].POWER_DATE + ' to ' +  res.data.data[23].POWER_DATE,
		
		

        // Data for Line Chart
	dataPower : {
	labels: [
	 res.data.data[0].POWER_DATE.substring(8,10),
	 res.data.data[1].POWER_DATE.substring(8,10),
	 res.data.data[2].POWER_DATE.substring(8,10),
	 res.data.data[3].POWER_DATE.substring(8,10),
	 res.data.data[4].POWER_DATE.substring(8,10),
	 res.data.data[5].POWER_DATE.substring(8,10),
	 res.data.data[6].POWER_DATE.substring(8,10),
	 res.data.data[7].POWER_DATE.substring(8,10),
	 res.data.data[8].POWER_DATE.substring(8,10),
	 res.data.data[9].POWER_DATE.substring(8,10),
	 res.data.data[10].POWER_DATE.substring(8,10),
	 res.data.data[11].POWER_DATE.substring(8,10),
	 res.data.data[12].POWER_DATE.substring(8,10),
	 res.data.data[13].POWER_DATE.substring(8,10),
	 res.data.data[14].POWER_DATE.substring(8,10),
	 res.data.data[15].POWER_DATE.substring(8,10),
	 res.data.data[16].POWER_DATE.substring(8,10),
	 res.data.data[17].POWER_DATE.substring(8,10),
	 res.data.data[18].POWER_DATE.substring(8,10),
	 res.data.data[19].POWER_DATE.substring(8,10),
	 res.data.data[20].POWER_DATE.substring(8,10),
	 res.data.data[21].POWER_DATE.substring(8,10),
	 res.data.data[22].POWER_DATE.substring(8,10),
	 res.data.data[23].POWER_DATE.substring(8,10)
	 
	],
	series: [
	[
	res.data.data[0].POWER_ACTUALS,
	res.data.data[1].POWER_ACTUALS,
	res.data.data[2].POWER_ACTUALS,
	res.data.data[3].POWER_ACTUALS,
	res.data.data[4].POWER_ACTUALS,
	res.data.data[5].POWER_ACTUALS,
	res.data.data[6].POWER_ACTUALS,
	res.data.data[7].POWER_ACTUALS,
	res.data.data[8].POWER_ACTUALS,
	res.data.data[9].POWER_ACTUALS
	],
	
	 [res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,	 
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power,
	 res.data.percentile_power
	 ],
	 
    [res.data.data[0].POWER_PREDICTION,
	res.data.data[1].POWER_PREDICTION,
	res.data.data[2].POWER_PREDICTION,
	res.data.data[3].POWER_PREDICTION,
	res.data.data[4].POWER_PREDICTION,
	res.data.data[5].POWER_PREDICTION,
	res.data.data[6].POWER_PREDICTION,
	res.data.data[7].POWER_PREDICTION,
	res.data.data[8].POWER_PREDICTION,
	res.data.data[9].POWER_PREDICTION,
	res.data.data[10].POWER_PREDICTION,
	res.data.data[11].POWER_PREDICTION,
	res.data.data[12].POWER_PREDICTION,
	res.data.data[13].POWER_PREDICTION,
	res.data.data[14].POWER_PREDICTION,
	res.data.data[15].POWER_PREDICTION,
	res.data.data[16].POWER_PREDICTION,
	res.data.data[17].POWER_PREDICTION,
	res.data.data[18].POWER_PREDICTION,
	res.data.data[19].POWER_PREDICTION,
	res.data.data[20].POWER_PREDICTION,
	res.data.data[21].POWER_PREDICTION,
	res.data.data[22].POWER_PREDICTION,
	res.data.data[23].POWER_PREDICTION
	
	]
   
  ]

    
  
}, 

		
       isLoading: false
      })
	  ;
	  console.log(res);
	
	
      })
   }
  
   
  render() {
	  const { isLoading, hydVar, dataPower, monthPred} = this.state;
	  console.log(' data : ' + dataPower);
	  	  console.log(' data : ' + hydVar);
		  	  console.log(' data : ' + isLoading);
    return (
	 <React.Fragment>
	 {!isLoading ? (
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
			<Col lg={10} sm={10}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Wind Power Projection"
                category={monthPred}
                stats="Updated now"
                content={
                  <div className="ct-chart">
             		<ChartistGraph
                      data={this.state.dataPower}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>

            
          </Row>
		  <Row>
		    <Col lg={10} sm={10}>
              <StatsCard
                bigIcon={<img src = {price1} height={500} width={500} />}
                statsText="Price of Hydrogen"
                statsValue=""
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
		  </Row>

        </Grid>

      </div>
	   ) : (
        <h3>Loading...</h3>
      )}
   </React.Fragment>

    );
  }
}

export default Dashboard;
