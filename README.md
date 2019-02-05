
# PickDrop
PickDrop is mapping the route for the user by asking user to input pick and drop location.

## Configuration

add .env file to the root of the project<br/>
define below keys in .env file<br/>
1. `REACT_APP_GOOGLE_API` : google map api key
2. `REACT_APP_API_URL` : backend api url

## Installation

execute `npm install` command to install the npm package mentioned in the package.json 

## Running the app
1. navigate to the project directory in terminal
2. execute `npm start` command

executing the command mentioned will runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Unit testing

1. navigate to the project directory in terminal
2. execute `npm test`

The project uses `jest` as it test runner. Project test are created closet to it source with the XX.test.js file name. For component testing `enzyme` package is used.



