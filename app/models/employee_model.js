var {connect, sql} = require('../../connect')
module.exports = class Employee{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM NHANVIEN";
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
        var sqlString = "SELECT * FROM NHANVIEN WHERE MANHANVIEN = @id";
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
        var sqlString = "INSERT INTO NHAVIEN( HOTENNV, CMND, NGAYSINH, GIOITINH, SODT, EMAIL, CHUCVU) VALUES( @HOTENNV, @CMND, @NGAYSINH, @GIOITINH, @SODT, @EMAIL @CHUCVU);";
        return await pool.request()
            .input('HOTENNV', sql.NVarChar, req.HOTENNV)
            .input('NGAYSINH', sql.Date, req.NGAYSINH)
            .input('NOISINH', sql.NVarChar, req.NOISINH)
            .input('GIOITINH', sql.Bit, req.GIOITINH)
            .input('SODT', sql.Char, req.SODT)
            .input('EMAIL', sql.VarChar, req.EMAIL)
            .input('CHUCVU', sql.NVarChar, req.CHUCVU)
            .input('CMND', sql.Char, req.CMND)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}