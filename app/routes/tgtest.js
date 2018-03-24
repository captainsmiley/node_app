var express = require('express');
var router = express.Router();
var nmap = require('node-nmap');
nmap.nmapLocation = "nmap"; //default

var redis_db = require('../redis_db');

var redis_client = redis_db.get();
var scan_data = null;

/* GET home page. */
router.get('/', function(req, res) {
  redis_client.get('id',function(err,id) {
    res.render('tgtest',{title: 'tgtest',id: id});
  })
});

router.get('/set/', function(req, res) {

  redis_client.set('tgtest','OK!!');
  redis_client.set('id',req.query.id);
  redis_client.get('tgtest', function(err, reply) {
    console.log(err);
    console.log(reply);
  })
  res.render('tgtest', { title: 'tgtest' });
});

router.get('/scan_result/',function(req,res) {
  if (scan_data)
  {
  scan_data.forEach(function(currentValue, currentIndex) {
    if (currentValue.openPorts.length > 0)
    {
      console.log(currentValue);
    }
  });
}
    res.render('tgtest', { title: 'tgtest' });
});


router.get('/scan/',function(req,res) {

  var scan = new nmap.NmapScan('192.168.0.1-100',['-p 80']);
  scan.on('complete', function(data) {
    scan_data = data;
  });
  scan.on('error', function(error) {
    console.log(error);
  });
  scan.startScan();
  res.redirect('/');
  //res.render('tgtest', { title: 'tgtest' });
});

module.exports = router;
