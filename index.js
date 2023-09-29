const express = require('express')
const app = express();
const cors = require('cors');

const port = 5000;

app.use(cors());
app.use(express.json())

app.use('/readexcel',require('./routes/readexcel'))
app.use('/writeexcel',require('./routes/addexcel'))
app.use('/',(req,res)=>{
    res.send('Hello');

})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})