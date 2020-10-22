var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var connection = mysql.createConnection({
  host          : 'localhost',
  user          : 'root',
  password      : 'D.1v1f9z6f3f8n7',
  database      : 'Lernplattform',
  insecureAuth  : true
})

const query = util.promisify(connection.query).bind(connection);

router.post('/', function (req, res) {
    (async () => {
        try {
            const row = await query(`SELECT * FROM users WHERE username='${req.body.username}'`);
            if(row[0]) {
                res.json(await bcrypt.compare(req.body.password, row[0].password).then((a) => {
                    return {status: a, username: row[0].username};
                }))
            } else {
                res.json({})
            }
        } finally {

        }
    }) ()
})

router.post('/new', function (req, res) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        (async () => {
            try {
                const row = await query(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.mail}', '${hash}')`);
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'nico.freundt@gmail.com',
                        pass: '.Toxo;plasmA.350'
                    },
                    proxy: 'http://HE112113.emea1.cds.t-internal.com:8080/'
                });
                transporter.sendMail({
                    from: 'nico.freundt@gmail.com',
                    to: `${req.body.mail}`,
                    subject: 'Hello',
                    text: `You've created a new account (${req.body.username}) with following address: ${req.body.mail}`,
                }, function(error, info) {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                if(row.warningCount === 0) {
                    res.json({ status: 200 })
                } else {
                    res.json({ status: 400, message: row.message })
                }
            } finally {

            }
        }) ()
    })
})

module.exports = router;