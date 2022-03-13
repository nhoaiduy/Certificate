const e = require('express');
var {connect, sql} = require('../../connect');
var Schedule = require('../models/schedule_model')
var model = new Schedule();
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
    var sqlString = "UPDATE LICHHOC SET THUHOC=@THUHOC, GIOHOC=@GIOHOC, KHAIGIANG=@KHAIGIANG, LICHTHIDK=@LICHTHIDK, MAKHOAHOC=@MAKHOAHOC WHERE MALH = @MALH";
    return await pool.request()
        .input('THUHOC', sql.NVarChar, req.THUHOC)
        .input('GIOHOC', sql.Time, req.GIOHOC)
        .input('KHAIGIANG', sql.Date, req.KHAIGIANG)
        .input('LICHTHIDK', sql.Date, req.LICHTHIDK)
        .input('MAKHOAHOC', sql.Int, req.MAKHOAHOC)
        .input('MALH', sql.Int, req.MALH)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM LICHHOC WHERE MALH = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}