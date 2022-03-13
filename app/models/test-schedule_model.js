var {connect, sql} = require('../../connect')
module.exports = class Test{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM LICHTHI";
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
        var sqlString = "SELECT * FROM LICHTHI WHERE MATH = @id";
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
        var sqlString = "INSERT INTO LICHTHI(MALOAICC, NGAYTHI, GIOTHI) VALUES(@MALOAICC, @NGAYTHI, @GIOTHI);";
        return await pool.request()
            .input('MALOAICC', sql.Int, req.MALOAICC)
            .input('NGAYTHI', sql.Date, req.NGAYTHI)
            .input('GIOTHI', sql.Time, req.GIOTHI)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}