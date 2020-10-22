var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');
var connection = mysql.createConnection({
  host          : 'localhost',
  user          : 'root',
  password      : 'D.1v1f9z6f3f8n7',
  database      : 'Lernplattform',
  insecureAuth  : true
})

const query = util.promisify(connection.query).bind(connection);

var array = [];


router.get('/', function(req, res, next) {
  updateArr('Python');
  res.json(array);
  array.length = 0;
})

router.get('/:topic', function(req, res, next) {
  (async () => {
    try {
      const rows = await query(`SELECT * FROM tasks WHERE Thema='${req.params.topic}';`);
      //console.log(rows);
      rows.map(a => array.push({
        ID: a.tasks_id,
        Titel: a.Titel,
        Text: a.Text,
        Level: a.Level,
        Topic: a.Thema
      }))
      setTimeout(function(){}, 3000);
      res.json(array);
    } finally {
      //connection.end();
    }
  }) ()
  array.length = 0;
});

router.get('/:topic/:level', function(req, res, next) {
  (async () => {
    try {
      const rows = await query(`SELECT * FROM tasks WHERE Thema='${req.params.topic}' AND Level='${req.params.level}';`);
      //console.log(rows);
      rows.map(a => array.push({
        ID: a.tasks_id,
        Titel: a.Titel,
        Text: a.Text,
        Level: a.Level,
        Topic: a.Thema
      }))
      setTimeout(function(){}, 3000);
      res.json(array);
    } finally {
      //connection.end();
    }
  }) ()
  array.length = 0;
});

module.exports = router;
