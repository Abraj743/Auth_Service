const express = require("express");
const {PORT} = require("./config/serverConfig")
const apiRoutes = require('./routers/index');
const bodyParser = require("body-parser");
const app = express();


const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT,() =>{
    console.log(`Server started at port:${PORT}`)
})

}

prepareAndStartServer();



