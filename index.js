const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const User = require('./models/user');

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

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('63833420db95b4cafb4f67f7');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const password = '2PFIFbNUlrlKlk9N';
    // const url = `mongodb+srv://denis:2PFIFbNUlrlKlk9N@cluster1.t6p3sge.mongodb.net/?retryWrites=true&w=majority`;
    const url = `mongodb://denis:2PFIFbNUlrlKlk9N@ac-z7bws4h-shard-00-00.wjjg1bb.mongodb.net:27017,ac-z7bws4h-shard-00-01.wjjg1bb.mongodb.net:27017,ac-z7bws4h-shard-00-02.wjjg1bb.mongodb.net:27017/?ssl=true&replicaSet=atlas-mf2uuk-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await mongoose.connect(url, {useNewUrlParser: true})
    
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'ltybc@mail.ru',
        name: 'Denis',
        cart: {items: []}
      });

      await user.save();
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) { 
    console.log(e);
  }
  
}

start()

