var {connect, sql} = require('../../connect')
module.exports = class Course{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM KHOAHOC";
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
        var sqlString = "SELECT * FROM KHOAHOC WHERE MAKHOAHOC = @id";
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
        var sqlString = "INSERT INTO KHOAHOC(TENKH, THOILUONG, MALOAICC) VALUES(@TENKH, @THOILUONG, @MALOAICC);";
        return await pool.request()
            .input('TENKH', sql.NVarChar, newData.TENKH)
            .input('THOILUONG', sql.Int, newData.THOILUONG)
            .input('MALOAICC', sql.Int, newData.MALOAICC)
            .query(sqlString, function (err, data) {
                    result(newData)
            })
    }
}