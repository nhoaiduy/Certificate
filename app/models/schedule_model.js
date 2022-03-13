var {connect, sql} = require('../../connect')
module.exports = class Schedule{
    getAll = async function(result){
        var pool = await connect;
        var sqlString = "SELECT * FROM LICHHOC";
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
        var sqlString = "SELECT * FROM LICHHOC WHERE MALH = @id";
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
        var sqlString = "INSERT INTO LICHHOC(THUHOC, GIOHOC, KHAIGIANG, LICHTHIDK, MAKHOAHOC) VALUES(@THUHOC, @GIOHOC, @KHAIGIANG, @LICHTHIDK, @MAKHOAHOC);";
        return await pool.request()
            .input('THUHOC', sql.NVarChar, req.THUHOC)
            .input('GIOHOC', sql.Time, req.GIOHOC)
            .input('KHAIGIANG', sql.Date, req.KHAIGIANG)
            .input('LICHTHIDK', sql.Date, req.LICHTHIDK)
            .input('MAKHOAHOC', sql.Int, req.MAKHOAHOC)
            .query(sqlString, function (err, data) {
                    result(req)
            })
    }
}