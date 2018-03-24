
var db = require('../db.js')

function Data(name) {
    this.name = name;
    //console.log(this.name + " created");
}

Data.prototype.addColumnIfNotExists = function (column_name,column_definition) {
    var name = this.name;
    return new Promise(function (resolve,reject) {

        db.get().query(
           /* "IF NOT EXISTS( SELECT NULL \n"+
                "FROM INFORMATION_SCHEMA.COLUMNS \n"+
                "WHERE table_name = "+name+" "+
                "AND column_name = "+column_name+") THEN "+ */
                "ALTER TABLE "+name+" ADD COLUMN "+column_name+" "+column_definition+";"
               // "END IF;"
            ,function (err, result) {
                if (err) reject(err);
                else resolve();
            });
    });
}


Data.prototype.build_table = function(){
    var name = this.name;
    return new Promise(function(resolve, reject) {
        db.get().query("CREATE TABLE IF NOT EXISTS "+ name+ " ("+
            "id INT AUTO_INCREMENT PRIMARY KEY," +
                "time DATETIME,"+
                "value DECIMAL(5,2)"+
                ")"
            ,function (err,result) {
                if (err){
                    reject(err);
                }
                else {
                    console.log('Table '+name+' created or exists');
                    resolve();
                }
            });
    });
}


Data.prototype.create = function(dateTime,value,done) {
    var data_name = this.name;
    var values = [dateTime.toISOString().
        replace(/T/,' ').
            replace(/\..+/,''),
        value]
    console.log(dateTime);
    console.log(values);
    db.get().query("INSERT INTO "+data_name+" (time, value) VALUES(?,?)", values, function (err,result) {
        if (err) return done(err)
        done(null,result.insertId)
    })
}


Data.prototype.getAll = function(done) {
    var data_name = this.name;
    db.get().query('SELECT * FROM '+data_name, function(err,rows) {
        if (err) return done(err)
        done(null,rows)
    })
}

function toXy(rows) {
    var data = [];
    for(i=0; i<rows.length; i++) {
        var t = new Date(rows[i].time);
        //console.log(rows[i].time);
        data.push({x: t, y: rows[i].value});
    }
    return data;
}

Data.prototype.getAllxy = function(done) {
    var name = this.name;
    db.get().query('SELECT * FROM '+name, function(err,rows) {
        if (err) return done(err)
        var data = toXy(rows);
        /*
        for(i=0; i<rows.length; i++) {
            data.push({x: rows[i].time, y: rows[i].temp});
        }
        */

        done(null,data)
    })
}


Data.prototype.getAllFromTime_xy = function(time, done) {
    var name = this.name;
    var value = time.toISOString().
        replace(/T/,' ').
        replace(/\..+/,'');
    db.get().query(
        'SELECT * FROM '+name+' where time >= \''+value+'\' '
        , function(err,rows) {
            if (err) return done(err)
            var data = toXy(rows);
            done(null,data)
        })
}
Data.prototype.getFromTo_xy = function(from,to,done) {
    var name = this.name;
    var from_value = from.toISOString().
        replace(/T/,' ').
        replace(/\..+/,'');
    var to_value = to.toISOString().
        replace(/T/,' ').
        replace(/\..+/,'');
    db.get().query(
        'SELECT * FROM '+name+' where time >= \''+from_value+'\' and time <= \''+to_value+'\' '
        , function(err,rows) {
            if (err) return done(err)
            var data = toXy(rows);
            done(null,data)
        })
}

module.exports = Data;
