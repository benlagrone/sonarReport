// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const sonar = require("./sonarReq");
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
var tmpData = [
    { "ID": "CAN", "LifeExpectancy": 80.66, "FertilityRate": 1.67, "Region": "North America", "Population": 33739900 },
    { "ID": "DEU", "LifeExpectancy": 79.84, "FertilityRate": 1.36, "Region": "Europe", "Population": 81902307 },
    { "ID": "DNK", "LifeExpectancy": 78.6, "FertilityRate": 1.84, "Region": "Europe", "Population": 5523095 },
    { "ID": "EGY", "LifeExpectancy": 72.73, "FertilityRate": 2.78, "Region": "Middle East", "Population": 79716203 },
    { "ID": "GBR", "LifeExpectancy": 80.05, "FertilityRate": 2, "Region": "Europe", "Population": 61801570 },
    { "ID": "IRN", "LifeExpectancy": 72.49, "FertilityRate": 1.7, "Region": "Middle East", "Population": 73137148 },
    { "ID": "IRQ", "LifeExpectancy": 68.09, "FertilityRate": 4.77, "Region": "Middle East", "Population": 31090763 },
    { "ID": "ISR", "LifeExpectancy": 81.55, "FertilityRate": 2.96, "Region": "Middle East", "Population": 7485600 },
    { "ID": "RUS", "LifeExpectancy": 68.6, "FertilityRate": 1.54, "Region": "Europe", "Population": 141850000 },
    { "ID": "USA", "LifeExpectancy": 78.09, "FertilityRate": 2.05, "Region": "North America", "Population": 307007000 }
];

app.get("/", (req, res) => {
    Promise.all(sonar.projects).then((project) => {
        res.render("index", { title: "Home", projectsData: project });
    })
});

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});

app.get("/bugs", (req, res) => {
    res.render("bugs-chart", {title:"Bugs"});
});

app.get("/chart", (req, res) => {
    Promise.all(sonar.projects).then((project) => {
        res.render("chart", { title: "SonarCube Chart View", projectsData: tmpData, projectsData2:project})
    })
})


/**
 * Server Activation
 */
app.listen(port, () => {

    console.log(`Listening to requests on http://localhost:${port}`);
});