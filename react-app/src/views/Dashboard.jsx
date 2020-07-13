
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

        // .280 Eur per kwH for Belgium
        var balancedSupplyCost = formatter.format((Math.round(res.data.percentile_power) * 280));

        // 1Kg produced per 48Kwh
        var hydrogenSupplyTon = Math.floor(res.data.power_excess_forhydrogen / 48)

        // 2.84 Eur per kg of hydrogen  
        var hydrogenSupplyCost = formatter.format(hydrogenSupplyTon * 2842);

        var totalPower = res.data.power_excess_forhydrogen + res.data.power_below_percentile;
        var hydrogenPercent = (res.data.power_excess_forhydrogen / totalPower) * 100;
        var gridPercent = (res.data.power_below_percentile / totalPower) * 100;

        var dataPie = {
          labels: [Math.round(gridPercent) + "%", 0, 0, 0, Math.round(hydrogenPercent) + "%"],
          series: [gridPercent, 0, 0, 0, hydrogenPercent]
        };

        var dataPowerLabels = res.data.data.map((arrayData)=> arrayData.POWER_DATE.substring(8, 10));
        var dataPowerActuals = res.data.data.map((arrayData)=> arrayData.POWER_ACTUALS);
        var dataPowerPercentile = res.data.data.map(()=> res.data.percentile_power);
        var dataPowerPrediction = res.data.data.map((arrayData)=> arrayData.POWER_PREDICTION);

        console.log("dataPowerActuals" + dataPowerActuals.concat(dataPowerPrediction));
        var dataPowerActualsSort = [...dataPowerActuals.concat(dataPowerPrediction)].sort();
        optionsSales.low = dataPowerActualsSort[1];
        optionsSales.high = Math.max(...dataPowerActuals.concat(dataPowerPrediction));
        console.log("optionsSales" + optionsSales.low + " " + optionsSales.high);
        this.setState({
          hydVar: hydrogenSupplyTon,

          monthPred: res.data.data[0].POWER_DATE + ' to ' + res.data.data[23].POWER_DATE,

          balancedSupplyPerDay: Math.round(res.data.percentile_power),
          balancedSupplyPrice: balancedSupplyCost,
          hydrogenSupplyCost: hydrogenSupplyCost,
          dataPie: dataPie,
          // Data for Line Chart
          dataPower: {
            labels: dataPowerLabels,
             series: [dataPowerActuals,dataPowerPercentile,dataPowerPrediction]
          },
          optionsSales: optionsSales,
          isLoading: false
        })
          ;
        console.log(res);


      })
  }


  render() {
    const { isLoading, hydVar, dataPower, monthPred } = this.state;
    console.log(' data dataPower : ' + dataPower);
    console.log(' data hydrogen video : ' + hydVar);
    console.log(' data is loading: ' + isLoading);
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
                          options={this.state.optionsSales}
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
