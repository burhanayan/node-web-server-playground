const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ':' + req.method +' '+ req.url;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
    
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance...',
//         message: 'Thank you for your patience'
//     })
// });

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    // res.send({
    //     name: 'Burhan',
    //     likes: [
    //         'Footbal',
    //         'Basketball'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page!',
        welcomeMessage: 'Hello this is my home page!'
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page!'
    });
});

app.get('/projects', (req, res) => {
    //res.send('About Page');
    res.render('projects.hbs', {
        pageTitle: 'Projects Page!',
        message: 'You can check my projects down below.'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad request'
    })
});

app.listen(port, () => {
    console.log('Server up is on port ' + port);
});