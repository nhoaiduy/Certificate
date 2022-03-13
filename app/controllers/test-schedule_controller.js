const e = require('express');
var {connect, sql} = require('../../connect');
var Test = require('../models/test-schedule_model')
var model = new Test();
exports.getList = async function(req, res){
    model.getAll(function(err, data){
        if(!err){
            res.send({result: data})
        }else{
            res.send({result: null})
        }
    })
}

exports.getById = async function(req, res){
    model.getOne(req,function(err, data){
        if(!err){
            res.send({result: data})
        }else{
            res.send({result: null})
        }
    })
}

exports.addNew = async function(req, res){
    model.create(req.body, function(err, data){
        if(!err){
            res.send({result: data})
        }else{
            res.send({result: null})
        }
    })
}

exports.update = async function(req, res){
    var pool = await connect;
    var sqlString = "UPDATE LICHTHI SET NGAYTHI=@NGAYTHI, GIOTHI=@GIOTHI WHERE MALT = @MALT";
    return await pool.request()
        .input('MALT', sql.Int, req.body.MALT)
        .input('NGAYTHI', sql.Date, req.body.NGAYTHI)
        .input('GIOTHI', sql.Time, req.body.GIOTHI)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM LICHTHI WHERE MALT = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}