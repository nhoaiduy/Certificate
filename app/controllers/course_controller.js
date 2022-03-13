const e = require('express');
var {connect, sql} = require('../../connect');
var Course = require('../models/course_model')
var model = new Course();
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
    var sqlString = "UPDATE KHOAHOC SET TENKH = @TENKH, THOILUONG=@THOILUONG, MALOAICC=@MALOAICC WHERE MAKHOAHOC = @ID";
    return await pool.request()
        .input('TENKH', sql.NVarChar, req.body.TENKH)
        .input('PHANLOAICC', sql.NVarChar, req.body.PHANLOAICC)
        .input('ID', sql.Int, req.body.MAKHOAHOC)
        .input('MALOAICC', sql.Int, req.body.MALOAICC)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM KHOAHOC WHERE MAKHOAHOC = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}