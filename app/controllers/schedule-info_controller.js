const e = require('express');
var {connect, sql} = require('../../connect');
var ScheduleInfo = require('../models/schedule-info_model')
var model = new ScheduleInfo();
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
    var sqlString = "UPDATE THONGTINGHIDANH SET PHONGHOC=@PHONGHOC, MALH = @MALH WHERE MALH = @MALH AND CMND=@CMND";
    return await pool.request()
        .input('CMND', sql.Int, req.CMND)
        .input('MALH', sql.Int, req.MALH)
        .input('PHONGHOC', sql.Char, req.PHONGHOC)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var MALH = req.params.MALH;
    var CMND = req.params.CMND;
    var pool = await connect;
    var sqlString = "DELETE FROM THONGTINGHIDANH WHERE MALH = @MALH AND CMND=@CMND";
    return pool.request()
        .input('MALH', sql.Int, MALH)
        .input('CMND', sql.Int, CMND)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}