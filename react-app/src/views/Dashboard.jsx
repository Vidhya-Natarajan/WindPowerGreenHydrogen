
import React, { Component } from "react";
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
  legendBar,
  costPerMw
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

      
       var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
       });
      
       var balancedSupplyCost = formatter.format((Math.round(res.data.percentile_power) * 280));

       console.log("balancedSupplyCost" + balancedSupplyCost);

       var hydrogenSupplyTon = Math.floor(res.data.power_excess_forhydrogen / 48) 

       var hydrogenSupplyCost = formatter.format(hydrogenSupplyTon * 2842);

       var totalPower = res.data.power_excess_forhydrogen + res.data.power_below_percentile;
       var hydrogenPercent = (res.data.power_excess_forhydrogen / totalPower) * 100;
       var gridPercent = (res.data.power_below_percentile / totalPower) * 100;

       var dataPie = {
        labels: [Math.round(gridPercent) + "%",0,0,0,Math.round(hydrogenPercent) + "%" ],
        series: [gridPercent,0,0,0,hydrogenPercent]
      };

        this.setState({
          hydVar: hydrogenSupplyTon,

          monthPred: res.data.data[0].POWER_DATE + ' to ' + res.data.data[23].POWER_DATE,

          balancedSupplyPerDay: Math.round(res.data.percentile_power),
          balancedSupplyPrice: balancedSupplyCost,
          hydrogenSupplyCost: hydrogenSupplyCost,
          dataPie: dataPie,
          // Data for Line Chart
          dataPower: {
            labels: [
              res.data.data[0].POWER_DATE.substring(8, 10),
              res.data.data[1].POWER_DATE.substring(8, 10),
              res.data.data[2].POWER_DATE.substring(8, 10),
              res.data.data[3].POWER_DATE.substring(8, 10),
              res.data.data[4].POWER_DATE.substring(8, 10),
              res.data.data[5].POWER_DATE.substring(8, 10),
              res.data.data[6].POWER_DATE.substring(8, 10),
              res.data.data[7].POWER_DATE.substring(8, 10),
              res.data.data[8].POWER_DATE.substring(8, 10),
              res.data.data[9].POWER_DATE.substring(8, 10),
              res.data.data[10].POWER_DATE.substring(8, 10),
              res.data.data[11].POWER_DATE.substring(8, 10),
              res.data.data[12].POWER_DATE.substring(8, 10),
              res.data.data[13].POWER_DATE.substring(8, 10),
              res.data.data[14].POWER_DATE.substring(8, 10),
              res.data.data[15].POWER_DATE.substring(8, 10),
              res.data.data[16].POWER_DATE.substring(8, 10),
              res.data.data[17].POWER_DATE.substring(8, 10),
              res.data.data[18].POWER_DATE.substring(8, 10),
              res.data.data[19].POWER_DATE.substring(8, 10),
              res.data.data[20].POWER_DATE.substring(8, 10),
              res.data.data[21].POWER_DATE.substring(8, 10),
              res.data.data[22].POWER_DATE.substring(8, 10),
              res.data.data[23].POWER_DATE.substring(8, 10)

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

              [
              /*res.data.data[0].POWER_PREDICTION,
              res.data.data[1].POWER_PREDICTION,
              res.data.data[2].POWER_PREDICTION,
              res.data.data[3].POWER_PREDICTION,
              res.data.data[4].POWER_PREDICTION,
              res.data.data[5].POWER_PREDICTION,
              res.data.data[6].POWER_PREDICTION,
              res.data.data[7].POWER_PREDICTION,
              res.data.data[8].POWER_PREDICTION,
              res.data.data[9].POWER_PREDICTION,*/
              null,
              null,
              null,
              null,
              null,
              null,
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
    const { isLoading, hydVar, dataPower, monthPred } = this.state;
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
                    statsText="Bal Grid Supply / Day (Mw)"
                    statsValue={this.state.balancedSupplyPerDay}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText="Updated now"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-wallet text-success" />}
                    bigIcon={<img src={graph} height={60} width={60} />}
                    statsText="Grid Supply Rev Projection"
                    statsValue={this.state.balancedSupplyPrice}
                    statsIcon={<i className="fa fa-calendar-o" />}
                    statsIconText="Last day"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<img src={logo2} height={60} width={60} />}
                    statsText="Hydrogen Supply Projection (Tons)"
                    statsValue={this.state.hydVar}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText="Updated now"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<img src={logo1} height={60} width={60} />}
                    statsText="Hydrogen Supply Rev Projection"
                    statsValue={this.state.hydrogenSupplyCost}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText="Updated now"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={8}>
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
             <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Wind Power distribution"
                category="Hydrogen vs Grid"
                stats="Updated day ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-major-second"
                  >
                    <ChartistGraph data={this.state.dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>

              </Row>
              <Row>
                <Col lg={10} sm={10}>
                  <StatsCard
                    bigIcon={<img src={price1} height={500} width={500} />}
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
