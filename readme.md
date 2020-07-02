# Wind Power Green Hydrogen Projection  

### Live Application URL
https://windpowergreenhydrogen.eu-gb.cf.appdomain.cloud
This URL has the application deployed in IBM Cloud foundry

## Prerequisites
1. Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

2. Db2 instance with below DDL
* COLUMN NAME         DATA TYPE NULLABLE LENGTH SCALE
* date_timestamp	        TIMESTAMP	Y	10	6	
* $FutureFlag	            BIGINT	    Y		0	
* power_actuals	        DOUBLE	    Y		0	
* $TS-power_actuals	    DOUBLE	    Y		0	
* $TSLCI-power_actuals	DOUBLE	    Y		0	
* $TSUCI-power_actuals	DOUBLE	    Y		0	

3. Note the service credentails

## Clone the app from Github
Clone the app from the Github. This will help to easily run the project and also build the source files easily. Use the following git to clone the app

Git Clone https://github.com/Vidhya-Natarajan/Wind-React-App.git


## Cloning and Running the Application in local

Clone the project into local

There are three folders
1. react-app  - contains the react application
2. server     - contains express server for API and serving react app
3. Watson Studio - files for machine learning

### Watson Studio Steps

1. Upload WindForecast_hourly_2019Jul_2020Jun_shaped .csv as a data source
2. Create a output data source with above Db2 instance
3. Import the wind_power_SPSS_flow.str in watson studio SPSS modeller
4. Run the flow and verify the db2 table 

### React-app & server steps


```
1. Install all the npm packages. Go into the react-app and server project folder and type the following command to install all npm packages

npm install

2. Update the db2 connection string based on Db2 credentials in /server/server.js

3. In order to run the application Type the following command
  3.a Run Server locally - 
node server.js

 3.b Run react app locally - 
 npm start
 
The Application Runs on localhost:3000

5. build

npm run-script compile-sass

npm run-script map-sass

npm run-script minify-sass

npm run-script build

4. push
 4.a copy the build folder in to server folder
 4.b Update the yaml file 
 4.c cf push in to IBM cloud Cloud foundry Org


```

### Application design
#### Components
View/Dashboard Component : This Component displays a dashboard for the Wind Power Forcast . The Dashboard provides the balance Grid suppy , Grip Suppy Revenue projection, Hygrogen supply projection, hydrogen supply renenue projection , Wind power distribution, price of hydrogen.

TBU Component : The other components are WIP ( work in Progress)

HTTP client
axios library is used to make HTTP + API Calls

URL
The application has just one url /admin/ dashboard which ties to View/Dashboard Component

Resources
ReactJS : Refer to https://reactjs.org/ to understand the concepts of ReactJS

React Bootstrap : Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap


## Live Application URL

The Application is deployed in https://windpowergreenhydrogen.eu-gb.cf.appdomain.cloud

Click on the link to see the application

