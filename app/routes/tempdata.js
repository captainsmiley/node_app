var express = require('express');
var router = express.Router();
var tempdata_tb = require('../models/tempdata.js')
var GenData = require('../models/gen_time_data.js')
var aux1 = new GenData('temp_aux1');
var aux2 = new GenData('temp_aux2');
var vreg = new GenData('temp_vreg');
var v_in = new GenData('v_in');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('tempdata', { title: 'Tempdata index' , name: 'temp_aux1'});
});
router.get('/getfrom/:time', function(req, res) {
  res.render('tempdata', { title: 'Tempdata index' , time : req.params.time});
});
router.get('/get/:name/:from/:to', function(req, res) {
  res.render('tempdata', {
      title: 'Tempdata index' ,
      name : req.params.name,
      from : req.params.from,
      to : req.params.from
  });
});

router.post('/send/', function(req, res) {
    var temp_aux1 = req.body.temp_aux1;
    var temp_aux2 = req.body.temp_aux2;
    var temp_vreg = req.body.temp_vreg;
    var p_v_in = req.body.v_in;

    console.log("Aux1: " + temp_aux1);
    console.log("Aux2: " + temp_aux2);
    console.log("vreg: " + temp_vreg);
    console.log("v_in: " + p_v_in);

    if (p_v_in) {
        v_in.create(new Date(),p_v_in,function(err) {
            if (err) console.log(err)
        });
    }
    if (temp_aux1) {
        aux1.create(new Date(),temp_aux1,function(err) {
            if (err) console.log(err)
        });
    }
    if (temp_aux2) {
        aux2.create(new Date(),temp_aux2,function(err) {
            if (err) console.log(err)
        });
    }
    if (temp_vreg) {
        vreg.create(new Date(),temp_vreg,function(err) {
            if (err) console.log(err)
        });
    }
    console.log('Stored');
    res.send('ok');
});


router.get('/tempdata', function(req, res) {
    aux1.getAllxy(function(err, data) {
        if (err) console.log(err)
        res.send(data);
    });
});

router.get('/lastday', function(req, res) {
    time = new Date()
    time.setDate(time.getDate()-1);
    res.render('tempdata', { title: 'Tempdata last day' , time : time});
});


router.get('/tempdatafrom/:time', function(req, res) {
    time = new Date(req.params.time);
    aux1.getAllFromTime_xy(time,function(err, data) {
        if (err) console.log(err)
        res.send(data);
    });
});

module.exports = router;
