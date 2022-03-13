module.exports = function(app){
    var csController = require('../controllers/candidate_controller')
    app.get('/candidate', csController.getList)
    app.get('/candidate/:ID', csController.getById)
    app.post('/candidate', csController.addNew)
    app.put('/candidate', csController.update)
    app.delete('/candidate/:ID', csController.delete)
}