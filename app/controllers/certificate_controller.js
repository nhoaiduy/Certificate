const e = require('express');
var {connect, sql} = require('../../connect');
var Certificate = require('../models/certificate_model')
var model = new Certificate();
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
    var sqlString = "UPDATE CHUNGCHI SET SOQD = @SOQD, SOHIEU=@SOHIEU, SOBAODANH=@SOBAODANH, CMND=@CMND, MALOAICC=@MALOAICC WHERE SOVAOSO = @ID";
    return await pool.request()
        .input('SOQD', sql.Char, newData.SOQD)
        .input('SOHIEU', sql.Char, newData.SOHIEU)
        .input('SOBAODANH', sql.Char, newData.SOBAODANH)
        .input('CMND', sql.Int, newData.CMND)
        .input('MALOAICC', sql.Int, newData.MALOAICC)
        .input('ID', sql.Int, newData.SOVAOSO)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM CHUNGCHI WHERE SOVAOSO = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}