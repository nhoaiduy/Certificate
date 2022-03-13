var {connect, sql} = require('../../connect')
module.exports = class ScheduleInfo{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM THONGTINGHIDANH";
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
        var sqlString = "SELECT * FROM THONGTINGHIDANH WHERE CMND = @id";
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
        var sqlString = "INSERT INTO THONGTINGHIDANH(CMND, MALH, PHONGHOC) VALUES(@CMND, @MALH, @PHONGHOC);";
        return await pool.request()
            .input('CMND', sql.Int, req.CMND)
            .input('MALH', sql.Int, req.MALH)
            .input('PHONGHOC', sql.Char, req.PHONGHOC)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}