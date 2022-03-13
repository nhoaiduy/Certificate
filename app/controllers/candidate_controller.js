const e = require('express');
var {connect, sql} = require('../../connect');
var Candidate = require('../models/candidate_model')
var model = new Candidate();
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
    var sqlString = "UPDATE THISINH SET HOTENTS = @HOTENTS, NGAYSINH=@NGAYSINH, NOISINH = @NOISINH, GIOITINH=@GIOITINH, SODT=@SODT, EMAIL=@EMAIL WHERE CMND=@ID";
    return await pool.request()
        .input('HOTENTS', sql.NVarChar, req.HOTENTS)
        .input('NGAYSINH', sql.Date, req.NGAYSINH)
        .input('NOISINH', sql.NVarChar, req.NOISINH)
        .input('GIOITINH', sql.Bit, req.GIOITINH)
        .input('SODT', sql.Char, req.SODT)
        .input('EMAIL', sql.VarChar, req.EMAIL)
        .input('ID', sql.Int, req.CMND)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM THISINH WHERE CMND = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}