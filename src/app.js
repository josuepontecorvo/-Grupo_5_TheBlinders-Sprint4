const express = require('express');
const path =  require('path');
const app = express();
const mainRouter = require('./routes/mainRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');


const port = 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/', mainRouter);
app.use('/productos', productsRouter);
app.use('/usuarios', usersRouter);


app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));


