var {connect, sql} = require('../../connect')
module.exports = class CertificateType{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM LOAICHUNGCHI";
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
        var sqlString = "SELECT * FROM LOAICHUNGCHI WHERE MALOAICC = @id";
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
        var sqlString = "INSERT INTO LOAICHUNGCHI(TENLOAICC, PHANLOAICC) VALUES(@TENLOAICC, @PHANLOAICC);";
        return await pool.request()
            .input('TENLOAICC', sql.NVarChar, newData.TENLOAICC)
            .input('PHANLOAICC', sql.NVarChar, newData.PHANLOAICC)
            .query(sqlString, function (err, data) {
                    result(newData)
            })
    }
}