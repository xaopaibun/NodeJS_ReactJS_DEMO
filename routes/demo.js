var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var session = require('express-session')
var cors = require('cors')
var multer = require('multer')
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const getdata = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("DbCayCanh");
    dbo.collection("CayCanh").find().toArray(function (err, result) {
      if (err) res.sendStatus(405);
      res.send(result);
      db.close();
    });
  });
}
router.use(cors());

const xoa = (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("DbCayCanh");
    var myquery = { _id: req.params.id };
    dbo.collection("CayCanh").deleteOne(myquery, function (err, obj) {
      if (err) res.sendStatus(405);
      res.send({ success: "Xóa dữ liệu thành công !" })
      db.close();
    });
  });
}

const add = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("DbCayCanh");
    let dulieuthem = { _id: req.body._id, name: req.body.name, img: req.body.img, Gia: req.body.Gia };
    dbo.collection("CayCanh").insertOne(dulieuthem, (err, result) => {
      if (err) res.sendStatus(405);
      res.send({ success: "Thêm dữ liệu thành công !" })
      db.close();
    });
  });
}

const getuser = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("DbCayCanh");
    dbo.collection("User").find().toArray(function (err, result) {
      if (err) res.sendStatus(405);
      res.send(result);
      db.close();
    });
  });
}

function authenToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  // 'Beaer [token]'
  const token = authorizationHeader.split(' ')[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    //console.log(err, data);
    if (err) res.sendStatus(403);
    next();
  });
}

const login = (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("DbCayCanh");
    dbo.collection("User").findOne({ gmail: req.body.username, matkhau: md5(req.body.password) }, function (err, result) {
      if (err) {
        res.sendStatus(405);
      }
      else{
        if(result != null){
          const accessToken = jwt.sign({ username: req.body.username, password: md5(req.body.password) }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s',
          });
          res.send({ accessToken: accessToken });
        }
        else{
          res.status(404).send({ ThongBao :"Bạn nhập sai tài khoản hoặc mật khẩu rồi" });
        }
      }
      db.close();
    });
  });
}


router.get('/', getdata);
router.get('/getuser', getuser);
router.delete('/xoa/:id', xoa);
router.post('/add', add);
router.post('/login', login);
module.exports = router;
