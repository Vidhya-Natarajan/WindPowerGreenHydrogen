const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

var ibmdb = require('ibm_db');
var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;UID=ckh46683;PWD=rkklpg^rdqxwcjxg;PORT=50000;PROTOCOL=TCPIP";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  
    ibmdb.open(connStr, function (err,conn) {
      if (err) return console.log(err);
      
      var sql_query = "SELECT json_object ( key 'date_timstamp' value \"date_timestamp\", key 'power_actuals' value \"power_actuals\",key '$TS-power_actuals' value \"$TS-power_actuals\") FROM CKH46683.WIND_PRED_RESULTS;";
      conn.query(sql_query, function (err, data) {
        if (err) console.log(err);
        else  
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