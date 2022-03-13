module.exports = function(app){
    var csController = require('../controllers/course_controller')
    app.get('/course', csController.getList)
    app.get('/course/:ID', csController.getById)
    app.post('/course', csController.addNew)
    app.put('/course', csController.update)
    app.delete('/course/:ID', csController.delete)
}