var {connect, sql} = require('../../connect')
module.exports = class Certificate{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM CHUNGCHI";
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
        var sqlString = "SELECT * FROM CHUNGCHI WHERE SOVAOSO = @id";
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
        var sqlString = "INSERT INTO CHUNGCHI(SOQD, SOHIEU, SOBAODANH, CMND, MALOAICC) VALUES(@SOQD, @SOHIEU, @SOBAODANH, @CMND, @MALOAICC);";
        return await pool.request()
            .input('SOQD', sql.Char, newData.SOQD)
            .input('SOHIEU', sql.Char, newData.SOHIEU)
            .input('SOBAODANH', sql.Char, newData.SOBAODANH)
            .input('CMND', sql.Int, newData.CMND)
            .input('MALOAICC', sql.Int, newData.MALOAICC)
            .query(sqlString, function (err, data) {
                    result(newData)
            })
    }
}