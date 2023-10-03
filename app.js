const express = require('express');

const hiraRouter = require('./routes/hira');
const nhisRouter = require('./routes/nhis');

const app = express();

app.set('port', process.env.ports||8080);

app.use(express.json())
app.use(express.urlencoded({extended:true}));



app.use('/hira',hiraRouter);
app.use('/nhis',nhisRouter);



app.use((req, res, next)=>{
    const error = new Error("url 주소를 잘못 입력하셨습니다.")
    error.status = 404
    next(error);
})


app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error');
  });

app.listen(app.get('port'),()=>{
    console.log("[Server] open : "+ app.get('port'))
})