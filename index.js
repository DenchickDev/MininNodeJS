const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const password = '2PFIFbNUlrlKlk9N';
    // const url = `mongodb+srv://denis:2PFIFbNUlrlKlk9N@cluster1.t6p3sge.mongodb.net/?retryWrites=true&w=majority`;
    const url = `mongodb://denis:2PFIFbNUlrlKlk9N@ac-z7bws4h-shard-00-00.wjjg1bb.mongodb.net:27017,ac-z7bws4h-shard-00-01.wjjg1bb.mongodb.net:27017,ac-z7bws4h-shard-00-02.wjjg1bb.mongodb.net:27017/?ssl=true&replicaSet=atlas-mf2uuk-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await mongoose.connect(url, {useNewUrlParser: true})
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) { 
    console.log(e);
  }
  
}

start()

