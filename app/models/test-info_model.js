var {connect, sql} = require('../../connect')
module.exports = class TestInfo{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM THONGTINDUTHI";
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
        var sqlString = "SELECT * FROM THONGTINDUTHI WHERE CMND = @id";
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
        var sqlString = "INSERT INTO THONGTINDUTHI(CMND, MALT, PHONGTHI, SOBAODANH) VALUES(@CMND, @MALT, @PHONGTHI, @SOBAODANH);";
        return await pool.request()
            .input('CMND', sql.Int, req.CMND)
            .input('MALT', sql.Int, req.MALT)
            .input('PHONGTHI', sql.Char, req.PHONGTHI)
            .input('SOBAODANH', sql.Char, req.SOBAODANH)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}