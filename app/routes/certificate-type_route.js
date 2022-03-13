module.exports = function(app){
    var ctfController = require('../controllers/certificate-type_controller')
    app.get('/certificate-type', ctfController.getList)
    app.get('/certificate-type/:ID', ctfController.getById)
    app.post('/certificate-type', ctfController.addNew)
    app.put('/certificate-type', ctfController.update)
    app.delete('/certificate-type/:ID', ctfController.delete)
}