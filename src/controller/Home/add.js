const add_item = (req, res, next)  => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    let id = req.body.id;
     let ten = req.body.name;
     let img = req.body.img;
     let Gia = req.body.Gia;
     con.query("INSERT INTO caycanh VALUES ("+id+",'"+ ten+"', '"+img+"', "+Gia+")", (err, result)  => {
       if (err)   res.send('Thêm Lỗi rồi', err);
       res.send('Thêm Thành công');
     });
}

module.exports = {
    add_item : add_item
};