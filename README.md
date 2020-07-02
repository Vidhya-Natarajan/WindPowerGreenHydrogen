

# Wind Power Projection React JS Project

## What is the use of this Repo

This Project is a Wind Power Projection React which demonstrates the following
1. Creating a Component in React
2. Making HTTP + API calls in express server
3. Communicating between parent and child component
4. Using Bootstrap along with React
5. Using Basic Routing in React

## Live Application URL

### https://windpowergreenhydrogen.eu-gb.cf.appdomain.cloud

This URL has the application deployed in

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Clone the app from Github
Clone the app from the Github. This will help to easily run the project and also build the source files easily. Use the following gito clone the app 


Git Clone https://github.com/Vidhya-Natarajan/Wind-React-App.git
```
## Live Application URL

The Application is deployed in https://windpowergreenhydrogen.eu-gb.cf.appdomain.cloud


Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

1. **View/Dashboard** Component : This Component displays a dashboard for the Wind Power Forcast . The Dashboard provides the balance Grid suppy , Grip Suppy Revenue projection, Hygrogen supply projection, hydrogen supply renenue projection , Wind power distribution, price of hydrogen.

2. **TBU** Component : The other components are WIP ( work in Progress)

#### HTTP client

**axios** library is used to make HTTP + API Calls

#### URL

The application has just one url /admin/ dashboard  which ties to *View/Dashboard* Component

## Resources

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**React Bootstrap** : Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap

## buid

npm run-script compile-sass

npm run-script map-sass

npm run-script minify-sass

## push

copy the build folder in to server folder

cf push in to IBM cloud 