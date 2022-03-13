const e = require('express');
var {connect, sql} = require('../../connect')
var CertificateType = require('../models/certificate-type_model')
var model = new CertificateType();
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
    var sqlString = "UPDATE LOAICHUNGCHI SET TENLOAICC = @TENLOAICC, PHANLOAICC = @PHANLOAICC WHERE MALOAICC = @ID";
    return await pool.request()
        .input('TENLOAICC', sql.NVarChar, req.body.TENLOAICC)
        .input('PHANLOAICC', sql.NVarChar, req.body.PHANLOAICC)
        .input('ID', sql.Int, req.body.MALOAICC)
        .query(sqlString, function (err, data) {
            res.send({result: data});
        })
}

exports.delete = async function(req, res){
    var id = req.params.ID;
    var pool = await connect;
    var sqlString = "DELETE FROM LOAICHUNGCHI WHERE MALOAICC = @id";
    return pool.request()
        .input('id', sql.Int, id)
        .query(sqlString, function (err, data) {
            if(!err) res.send({result: "Xóa thành công"})
            else res.send({result: "Xóa không thành công"})
        })
}