var request = require('request');
var cookie = require('./cookie-import.json');
// var async = require("async");
var rp = require('request-promise');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let projectsJSON = require('./projects.json');
var baseUrl = 'https://sesvc.shell.com/api/';
var issuesURL = 'issues/search?componentKeys=';
// var typesStrUrl = '&types=';
// var sevsStrUrl = '&severities='
var severitiesArray = ['BLOCKER', 'CRITICAL'];
var typesArray = ['VULNERABILITY', 'BUG', 'SECURITY_HOTSPOT'];
var cookie = cookie;
var options = {
  'method': 'GET',
  'headers': {
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'Sec-Fetch-Dest': 'empty',
    'X-XSRF-TOKEN': 'o129mugh1qo06b7pis82rd85g3',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors', 'Accept-Language': 'en-US,en;q=0.9',
    'Cookie': [cookie]
  }
};

var sonarArray = []

function makeStuff(res,project){

  var result = JSON.parse(res)
  var bugs = result.issues.filter(issue => issue.type === "BUG");
  var vulnerabilities = result.issues.filter(issue => issue.type === "VULNERABILITY");
  var security_hotspots = result.issues.filter(issue => issue.type === "SECURITY_HOTSPOT");
  return projItem = {
    url: baseUrl + issuesURL + project.key + '&resolved=false&ps=0&' +
      'types=' + typesArray[0] + '%2C' + typesArray[1] + '%2C' + typesArray[2] +
      '&severities=' + severitiesArray[0] + '%2C' + severitiesArray[1],
    title: project.title,
    name: project.name,
    key: project.key,
    totalIssues: result.total,
    effortTotal: result.effortTotal,
    issues: (result.issues ? result.issues.length : 0),
    open: result.issues ? result.issues.filter(issue => issue.status === "OPEN").length : 0,
    closed: result.issues ? result.issues.filter(issue => issue.status === "CLOSED").length : 0,
    resolved: result.issues ? result.issues.filter(issue => issue.status === "RESOLVED").length : 0,
    bugs: {
      total: bugs.length,
      open: bugs.filter(issue => issue.status === "OPEN").length,
      closed: bugs.filter(issue => issue.status === "CLOSED").length,
      resolved: bugs.filter(issue => issue.status === "RESOLVED").length,
      critical: {
        open: bugs.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "CRITICAL"),
        open: bugs.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "CRITICAL"),
        open: bugs.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "CRITICAL"),
      },
      blocker: {
        open: bugs.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "BLOCKER"),
        open: bugs.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "BLOCKER"),
        open: bugs.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "BLOCKER"),
      }
    },
    vulnerability: {
      total: vulnerabilities.length,
      open: vulnerabilities.filter(issue => issue.status === "OPEN").length,
      closed: vulnerabilities.filter(issue => issue.status === "CLOSED").length,
      resolved: vulnerabilities.filter(issue => issue.status === "RESOLVED").length,
      critical: {
        open: vulnerabilities.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "CRITICAL"),
        open: vulnerabilities.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "CRITICAL"),
        open: vulnerabilities.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "CRITICAL"),
      },
      blocker: {
        open: vulnerabilities.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "BLOCKER"),
        open: vulnerabilities.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "BLOCKER"),
        open: vulnerabilities.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "BLOCKER"),
      }
    },
    security_hotspot: {
      total: security_hotspots.length,
      open: security_hotspots.filter(issue => issue.status === "OPEN").length,
      closed: security_hotspots.filter(issue => issue.status === "CLOSED").length,
      resolved: security_hotspots.filter(issue => issue.status === "RESOLVED").length,
      critical: {
        open: security_hotspots.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "CRITICAL"),
        open: security_hotspots.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "CRITICAL"),
        open: security_hotspots.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "CRITICAL"),
      },
      blocker: {
        open: security_hotspots.filter(issue => issue.status === "OPEN").filter(issue => issue.severity === "BLOCKER"),
        open: security_hotspots.filter(issue => issue.status === "CLOSED").filter(issue => issue.severity === "BLOCKER"),
        open: security_hotspots.filter(issue => issue.status === "RESOLVED").filter(issue => issue.severity === "BLOCKER"),
      }
    }
  };
};

function getData(project, cb) {
  options.url = baseUrl + issuesURL + project.key + '&resolved=false&ps=0&' +
  'types=' + typesArray[0] + '%2C' + typesArray[1] + '%2C' + typesArray[2] +
  '&severities=' + severitiesArray[0] + '%2C' + severitiesArray[1];
  rp(options)
  .then(function (res) {
    cb(makeStuff(res,project))
  })
  .catch(function (err) {
    console.log(err)
  });
};

var projects = projectsJSON.map((project) => {
  return new Promise((resolve) => {
    getData(project, resolve)

  })
})


exports.projects = projects;

