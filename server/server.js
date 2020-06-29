const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

var ibmdb = require('ibm_db');
const moment = require('moment');

const path = require('path');

var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;UID=ckh46683;PWD=rkklpg^rdqxwcjxg;PORT=50000;PROTOCOL=TCPIP";

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
      
      console.log('done');
      var sql_query_allrows = "SELECT  \"date_timestamp\", \"power_actuals\"," + 
                      " \"$TS-power_actuals\") FROM CKH46683.WIND_PRED_RESULTS;"; 
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
        var sql_query_month = "SELECT  \"date_timestamp\",  \"power_actuals\"," + 
                               "\"$TS-power_actuals\" as power_prediction" + 
                               " FROM CKH46683.WIND_PRED_RESULTS" + 
                               " where \"date_timestamp\" > ('" + 
                                prev_timestamp + "');";             
        conn.query(sql_query_month, function (err, data) {
          if (err) console.log(err);
          else  
            console.log(data);
            res.send({ data });
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