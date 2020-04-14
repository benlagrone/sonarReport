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

app.get("/", (req, res) => {
    Promise.all(sonar.projects).then((project) => {
        res.render("index", { title: "SonarCube Overview", projectsData: project });
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
        res.render("chart", { title: "SonarCube Chart View", projectsData2:project})
    })
})

app.get("/effort", (req, res) => {
    Promise.all(sonar.projects).then((project) => {
        res.render("sonar-effort", { title: "SonarCube Effort View", projectsData2:project})
    })
})

/**
 * Server Activation
 */
app.listen(port, () => {

    console.log(`Listening to requests on http://localhost:${port}`);
});