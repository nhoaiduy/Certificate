module.exports = function(app){
    var csController = require('../controllers/certificate_controller')
    app.get('/certificate', csController.getList)
    app.get('/certificate/:ID', csController.getById)
    app.post('/certificate', csController.addNew)
    app.put('/certificate', csController.update)
    app.delete('/certificate/:ID', csController.delete)
}