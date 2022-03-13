module.exports = function(app){
    var csController = require('../controllers/schedule-info_controller')
    app.get('/schedule-info', csController.getList)
    app.get('/schedule-info/:ID', csController.getById)
    app.post('/schedule-info', csController.addNew)
    app.put('/schedule-info', csController.update)
    app.delete('/schedule-info/:MALh/:CMND', csController.delete)
}