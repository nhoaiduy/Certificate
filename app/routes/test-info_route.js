module.exports = function(app){
    var csController = require('../controllers/test-info_controller')
    app.get('/test-info', csController.getList)
    app.get('/test-info/:ID', csController.getById)
    app.post('/test-info', csController.addNew)
    app.put('/test-info', csController.update)
    app.delete('/test-info/:MALT/:CMND', csController.delete)
}