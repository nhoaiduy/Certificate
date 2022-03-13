var {connect, sql} = require('../../connect')
module.exports = class Account{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM TAIKHOAN";
        return await pool.request().query(sqlString, function(err, data){
            if(data.recordset.length>0){
                result(null, data.recordset)
            }else{
                result(true, null)
            }
        })
    }

    getOne = async function(req,result){
        var id = req.params.ID;
        var pool = await connect;
        var sqlString = "SELECT * FROM TAIKHOAN WHERE MANHANVIEN = @id";
        return pool.request()
            .input('id', sql.Int, id)
            .query(sqlString, function (err, data) {
                if(data.recordset.length>0){
                    result(null, data.recordset[0])
                }else{
                    result(true, null)
                }
            })
    }

    create = async function(req, result){
        var pool = await connect;
        var sqlString = "INSERT INTO TAIKHOAN(MANHANVIEN, MATKHAU, MUCDOTRUYCAP) VALUES(@MANHANVIEN, @MATKHAU, @MUCDOTRUYCAP);";
        return await pool.request()
            .input('MANHANVIEN', sql.Int, req.MANHANVIEN)
            .input('MATKHAU', sql.Char, req.MATKHAU)
            .input('MUCDOTRUYCAP', sql.NVarChar, req.MUCDOTRUYCAP)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}