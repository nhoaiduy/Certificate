const e = require('express');
var {connect, sql} = require('../../connect');
var TestInfo = require('../models/test-info_model')
var model = new TestInfo();
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
    var sqlString = "UPDATE THONGTIN SET PHONGTHI=@PHONGTHI, SOBAODANH=@SOBAODANH WHERE MALT = @MALT AND CMND=@CMND";
    return await pool.request()
        .input('MALT', sql.Int, req.body.MALT)
        .input('CMND', sql.Int, req.body.CMND)
        .input('PHONGTHI', sql.Char, req.body.PHONGTHI)
        .input('SOBAODANH', sql.Char, req.body.SOBAODANH)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var MALT = req.params.MALT;
    var CMND = req.params.CMND;
    var pool = await connect;
    var sqlString = "DELETE FROM THONGTINDUTHI WHERE MALT = @MALT AND CMND=@CMND";
    return pool.request()
        .input('MALT', sql.Int, MALT)
        .input('CMND', sql.Int, CMND)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}