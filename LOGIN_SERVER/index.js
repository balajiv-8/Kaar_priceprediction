
const express = require('express');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,            
    optionSuccessStatus:200
}
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')

const PORT  = process.env.PORT  || 5500;

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(authRouter);

const DB = "mongodb+srv://balajich8:balajibalaji@cluster0.mnb8kcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DB).then(
    console.log('CONNECTED TO DB')
)




app.listen(PORT , "0.0.0.0" , ()=>{
    console.log(`CONNECTED IN ${PORT}`);
    
});

