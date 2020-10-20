# Intermediate JS #2: Mars Rover Dashboard
## Overview
**Mars Rover Dashboard** is the second project of Udacity [Intermediate JavaScript](https://www.udacity.com/course/intermediate-javascript-nanodegree--nd032) nanodegree program. It requires to build out a dashboard that displays data and photos from one of the Mars rovers selected by user. The dasboard consumes the [NASA API](https://api.nasa.gov/).

The project has the following goals:
* using pure functions
* iterating over, reshaping, and accessing information from complex API responses
## Features
**Mars Rover Dashboard** has the following features:
* UI shows the following:
  * A gallery of the most recent images sent from each mars rover
  * The launch date, landing date, name and status of the rover
  * A navigation menu for the user to choose which rover's information they want to see
  
  ![image](https://user-images.githubusercontent.com/53233637/96525157-17621980-122f-11eb-9d43-3ad3a9875204.png)
  
* UI is responsive on the following devices:
  * Phones (max-width 768px)
  * Desktop (min-width 991px, max-width 1824px)
### Frontend Code
Frontend code meets the following requirements:
* Only pure functions are used
* At least one Higher Order Function is used
* Array method ```map``` is used
* ```ImmutableJS``` library is used
### Backend Code
Backend code meets the following requirements:
* The app is built with ***Node/Express***
* Calls to the [NASA API](https://api.nasa.gov/) are made successfully
* To do any logic necessary, only pure functions are used
* Any sensitive information is hidden from the public vies
## Getting Started
### Prerequisites
1. Download [NASA API key](https://api.nasa.gov/).
2. Clone this repo.
3. ```cd``` into project directory.
4. Create ```.env``` file and specify the credentials:
```
API_KEY = <your-api-key>
```
### Running Locally
To run **Mars Rover Dashboard** from project directory,
1. Install dependencies.
```sh
npm install
```
2. Start the server.
```sh
npm start
```
3. Access  http://localhost:3000 in your browser.
## Authors
Alexandra Baturina
