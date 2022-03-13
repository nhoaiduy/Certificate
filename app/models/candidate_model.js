var {connect, sql} = require('../../connect')
module.exports = class Candidate{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM THISINH";
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
        var sqlString = "SELECT * FROM THISINH WHERE CMND = @id";
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

    create = async function(newData, result){
        var pool = await connect;
        var sqlString = "INSERT INTO THISINH(CMND, HOTENTS, NGAYSINH, NOISINH, GIOITINH, SODT, EMAIL) VALUES(@CMND, @HOTENTS, @NGAYSINH, @NOISINH, @GIOITINH, @SODT, @EMAIL);";
        return await pool.request()
            .input('HOTENTS', sql.NVarChar, req.HOTENTS)
            .input('NGAYSINH', sql.Date, req.NGAYSINH)
            .input('NOISINH', sql.NVarChar, req.NOISINH)
            .input('GIOITINH', sql.Bit, req.GIOITINH)
            .input('SODT', sql.Char, req.SODT)
            .input('EMAIL', sql.VarChar, req.EMAIL)
            .input('CMND', sql.Int, req.CMND)
            .query(sqlString, function (err, data) {
                    result(newData)
            })
    }
}