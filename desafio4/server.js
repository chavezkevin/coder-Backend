const express = require('express')
const app = express();
const rutas = require('./routes/index.js');
const puerto = 8080;


//conf para axeder al body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static(__dirname + '/plublic'));

app.use('/api', rutas);

app.listen(puerto, () =>{
    console.log(`el servidor esta escuchando el puerto: ${puerto}`)
})