const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

var ibmdb = require('ibm_db');
const moment = require('moment');

const path = require('path');

const percentile = require('percentile');

var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;UID=ckh46683;PWD=rkklpg^rdqxwcjxg;PORT=50000;PROTOCOL=TCPIP";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var prev_timestamp = moment().subtract(14,'days').format('YYYY-MM-DD hh:mm:ss');

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/WindpredAll', (req, res) => {
  
    ibmdb.open(connStr, function (err,conn) {
      if (err) return console.log(err);
           
      var sql_query_allrows = "SELECT  \"date_timestamp\", \"power_actuals\"," + 
                      " \"$TS-power_actuals\ as power_prediction\") FROM CKH46683.WIND_PRED_RESULTS;"; 
      conn.query(sql_query_allrows, function (err, data) {
        if (err) console.log(err);
        else  
          res.send({ data });
          conn.close(function () {
          console.log('done');
        });
      });
    });
    });

    app.get('/api/WindpredMonth', (req, res) => {
        ibmdb.open(connStr, function (err,conn) {
        if (err) return console.log(err);
        var sql_query_month = "SELECT  date(\"date_timestamp\") as power_date," +
                                  " sum(\"power_actuals\") as power_actuals," + 
                               " sum(\"$TS-power_actuals\") as power_prediction" + 
                               " FROM CKH46683.WIND_PRED_RESULTS" + 
                               " where \"date_timestamp\" > ('" + prev_timestamp + "')" +        
                                " group by date(\"date_timestamp\");" ;

        conn.query(sql_query_month, function (err, data) {
          if (err) console.log(err);
          else  
            mean_power = 0;
            percentile_percentage = 30;
            percentile_power = 0;
            power_excess_forhydrogen = 0;
            power_below_percentile = 0;
            power_shortfall_instance = 0;
            power_excess_instance = 0;
            //data1 = Object.assign({},data,{"mean_power":mean_power});
            //data = data.concat({"mean":mean_power},data)
            power_actuals_array = []
            power_prediction_array = []
            data.forEach(element => {
               power_actuals_array.push(element.POWER_ACTUALS);  
               power_prediction_array.push(element.POWER_PREDICTION?element.POWER_PREDICTION:0);
              });
            percentile_power = percentile(percentile_percentage,power_prediction_array);

            power_prediction_array.forEach(item => {
                    if (item>percentile_power){
                      power_excess_forhydrogen=power_excess_forhydrogen + (item-percentile_power)
                      power_below_percentile=power_below_percentile + percentile_power
                     }
                     else{
                        power_below_percentile=power_below_percentile + item
                     }
                    ((item>percentile_power)?++power_excess_instance:++ power_shortfall_instance);
             });

            /*console.log('power prediction' + power_prediction_array);
            console.log ('percentile_power' + percentile_power);
            console.log ('power_excess_forhydrogen' + power_excess_forhydrogen);
            console.log ('power_below_percentile' + power_below_percentile);
            console.log ('power_excess_instance' + power_excess_instance);
            console.log ('power_shortfall_instance' + power_shortfall_instance);*/

            data1 = {"percentile_power": percentile_power,
                    "percentile_percentage":percentile_percentage, 
                    "power_excess_forhydrogen":power_excess_forhydrogen, 
                    "power_below_percentile":power_below_percentile,  
                    "power_excess_instance":power_excess_instance,  
                    "power_shortfall_instance":power_shortfall_instance,  
                     "data":data};
            res.send(data1);
            
            conn.close(function () {
            console.log('done');
          });
        });
      });
    });

      
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));