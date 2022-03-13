module.exports = function(app){
    var csController = require('../controllers/account_controller')
    app.get('/account', csController.getList)
    app.get('/account/:ID', csController.getById)
    app.post('/account', csController.addNew)
    app.put('/account', csController.update)
    app.delete('/account/:ID', csController.delete)
}