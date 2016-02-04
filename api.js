'use strict';

var koa = require("koa");
var serve = require('koa-static');
var _ = require('koa-route');

var compose = require("koa-compose");
var path = require("path");
var app = koa();


var projectRoot = __dirname;
var stylesRoot = path.join(projectRoot, "public/styles");
var staticRoot = path.join(projectRoot);

var middlewareStack = [
    require('koa-less')(stylesRoot, {
	  dest: stylesRoot
	}),
    // компилирует less в css, если был запрошен файл со стилями, имеет много интересных опций
    require('koa-logger')(), // логирует все http запросы
    require('koa-favicon')(staticRoot + '/favicon.ico'),
    require('koa-static')(staticRoot), // отдает статику, удобно для разработки, лучше конечно делать это nginx`ом
];

require('koa-locals')(app); 
// добавляет объект locals к контексту запроса, в который вы можете записывать все, что угодно

app.use(compose(middlewareStack));

//error handler
app.use(function* (next) {
    try {
        yield next
    } catch (err) {
        this.app.emit('error', err, this); // транслировать тело ошибки в консоль
        yield this.render('service/error', {
            message: err.message,
            error: err
        })
    }
})

var port = 3333;

var user = {
    save: function*() {
        this.body = JSON.stringify({name: "Dmitry"});
    },
    get: function*() {
        this.body = JSON.stringify({name: "Dmitry"});
    },
    login: function*() {
        this.body = JSON.stringify({name: "Dmitry"});
    }
};

app.use(_.post('/api/user', user.save));
app.use(_.post('/api/login', user.login));
app.use(_.get('/api/user/:id', user.get));

var server = app.listen(port, function() {
	console.log("Server available on [%s] port", port);
});