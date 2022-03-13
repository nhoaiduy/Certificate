const e = require('express');
var {connect, sql} = require('../../connect');
var Employee = require('../models/employee_model')
var model = new Employee();
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
    var sqlString = "UPDATE NHANVIEN SET HOTENNV = @HOTENNV,CMND=@CMND NGAYSINH=@NGAYSINH, GIOITINH=@GIOITINH, SODT=@SODT, EMAIL=@EMAIL, CHUCVU=@CHUCVU WHERE MANHANVIEN=@ID";
    return await pool.request()
        .input('HOTENNV', sql.NVarChar, req.HOTENNV)
        .input('NGAYSINH', sql.Date, req.NGAYSINH)
        .input('CMND', sql.Char, req.CMND)
        .input('GIOITINH', sql.Bit, req.GIOITINH)
        .input('SODT', sql.Char, req.SODT)
        .input('EMAIL', sql.VarChar, req.EMAIL)
        .input('CHUCVU', sql.NVarChar, req.CHUCVU)
        .input('ID', sql.Int, req.MANHANVIEN)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM NHAVIEN WHERE MANHANVIEN = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}