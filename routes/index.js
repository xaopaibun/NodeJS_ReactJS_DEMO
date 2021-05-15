var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session')
var cors = require('cors')
var multer = require('multer')
// var upload = multer({ storage: storage })
var nodemailer = require('nodemailer');
var md5 = require('md5');

var jwt = require('jsonwebtoken');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: 'root',
//   password: '',
//   database: 'dbcaycanh'
// });
// con.connect();
// // var storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, './public/uploads')
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// //     cb(null, file.originalname + '-' + uniqueSuffix)
// //   }
// // })

// router.use(cors());

// const getdata = (req, res, next) => {

//   con.query("SELECT * FROM caycanh", function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// }

// router.get('/getdata', getdata);

// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// router.post('/add', (req, res, next) => {
 
//   let id = req.body.id;
//   let ten = req.body.name;
//   let img = req.body.img;
//   let Gia = req.body.Gia;
//   con.query("INSERT INTO caycanh VALUES (" + id + ",'" + ten + "', '" + img + "', " + Gia + ")", (err, result) => {
//     if (err){
//       res.sendStatus(405);
//     }
//     else{
//       res.send({success :"Thêm dữ liệu thành công !"})
//     }
    
//   });
// });

// router.delete('/xoa/:id', (req, res, next) => {
//   let id = req.params.id;
//   con.query("DELETE FROM `caycanh` WHERE `caycanh`.`id` = " + id + "", (err, result) => {
//     if (err){
//       res.sendStatus(405);
//     }
//     else{
//       res.send({success :"Xóa dữ liệu thành công !"})
//     }
//   });
// });

// router.put('/sua/:id', cors(), (req, res, next) => {
//   let id = req.params.id;
//   let ten = req.body.name;
//   let img = req.body.img;
//   let Gia = req.body.Gia;

//   con.query("UPDATE `caycanh` SET `name` = '" + ten + "', `img` = '" + img + "', `Gia` = '" + Gia + "' WHERE `caycanh`.`id` = " + id + "", (err, result) => {
//     if (err){
//       res.send(err);
//     }
//     else{
//       res.send({success :"Sửa dữ liệu thành công !"})
//     }
//   });
// });

// router.get('/getdata/:page', (req, res, next) => {
//   let limit = 4;
//   let start = (req.params.page - 1) * limit;
//   con.query("SELECT * FROM caycanh limit " + start + ", " + limit + "", function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// router.get('/getpage', (req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   con.query("SELECT count(*) FROM caycanh ", function (err, result, fields) {
//     if (err) res.sendStatus(404);
//     res.send(Object.values(result[0]));
//   });
// });
// function authenToken (req, res, next) {
//   const authorizationHeader = req.headers['authorization'];
//   // 'Beaer [token]'
//   const token = authorizationHeader.split(' ')[1];
//   if (!token) res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
//     //console.log(err, data);
//     if (err) res.sendStatus(403);
//     next();
//   });
// }

// router.post('/login', (req, res, next) => {
//   let username = req.body.username;
//   let password = md5(req.body.password);
//   con.query("SELECT COUNT(*) as SoLuongUser FROM `user` WHERE gmail = '" + username + "' and matkhau = '" + password + "'", (err, result, fields) => {
//     if (err) {
//       res.sendStatus(405);
//     }
//     else {
//       let abc = Object.values(result[0]);
//       if (abc[0] == 1) {
//         const accessToken = jwt.sign({ username: username, password: password }, process.env.ACCESS_TOKEN_SECRET, {
//           expiresIn: '30s',
//         });
//         res.send({ accessToken: accessToken , Username : username});
//       }
//       else{
//         res.sendStatus(401);
//       }
//     }
//   });
// });


// router.get('/send', function (req, res, next) {

//   res.send('heheh');
// });
// router.get('/lay', function (req, res, next) {

//   res.send(req.session.quy);

// });

// router.post('/send-mail', (req, res) => {
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'vanquy33338888@gmail.com',
//       pass: '01652343938'
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });

//   var mainOptions = {
//     from: 'Phạm Jin',
//     to: req.body.mail,
//     subject: 'Test Thôi',
//     text: 'Đại học điẹn lực',

//   }
//   transporter.sendMail(mainOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//       req.flash('mess', 'Lỗi gửi mail: ' + err);
//       res.redirect('/');
//     } else {
//       console.log('Message sent: ' + info.response);
//       req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn');
//       res.redirect('/');
//     }
//   });
// });

// router.post('/dangky', cors(), function (req, res, next) {
//   let username = req.body.gmail;
//   let sdt = req.body.sdt;
//   let password = md5(req.body.pass);
//   con.query("INSERT INTO `user` (`gmail`, `sdt`, `matkhau`) VALUES ('" +username + "', '" + sdt + "', '" + password + "')", (err, result) => {
//     if (err){
//       res.sendStatus(405);
//     }
//     else{
//       res.send({success :"Đăng ký tài khoản thành công !"})
//     }
//   });
// });



module.exports = router;
