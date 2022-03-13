const e = require('express');
var {connect, sql} = require('../../connect');
var Account = require('../models/account_model')
var model = new Account();
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
    var sqlString = "UPDATE TAIKHOAN SET MATKHAU=@MATKHAU, MUCDOTRUYCAP=@MUCDOTRUYCAP WHERE MANHAVIEN = @MANHANVIEN";
    return await pool.request()
        .input('MANHANVIEN', sql.Int, req.body.MANHANVIEN)
        .input('MATKHAU', sql.Char, req.body.MATKHAU)
        .input('MUCDOTRUYCAP', sql.NVarChar, req.body.MUCDOTRUYCAP)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM TAIKHOAN WHERE MANHANVIEN = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}