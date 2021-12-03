const express = require('express');//import
const mongoose = require('mongoose');
const app = express();// initialize
const path = require('path');
const cors = require('cors');

const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const Category = require('./models/categoryModel');
const Order = require('./models/orderModel');
const Product = require('./models/productModel');
const auth=require("./middleware/auth");

const UserRouter = require('./routes/userRoute');
const ProductRouter = require('./routes/productRoute');
const OrderRouter = require('./routes/orderRoute');
const CartRouter = require('./routes/cartRoute');
const CategoryRouter = require('./routes/categoryRoute');
const upload = require('./middleware/fileupload');
const SalesRouter=require('./routes/salesRoute');


//connection
mongoose.connect('mongodb://127.0.0.1/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database server connected'))
  .catch((err) => console.log(err));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//callback 
app.get('/', (req, res, next) => {
  res.send('Server is running');

});
app.use('/mysales', SalesRouter);
app.use('/product', ProductRouter);
//app.use('/cart', CartRouter);
 app.use('/category', CategoryRouter);
 //app.use('/order', OrderRouter);
app.use('/user', UserRouter);// for login
//image upload 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', upload);
app.use('/cart',auth.verifyUser, CartRouter);
app.use('/order',auth.verifyUser, OrderRouter);
//error handling
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
})
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500); //default error
  res.json({
    status: 'error',
    message: err.message
  });
})






app.listen(90, () => {
  console.log('Server is running at localhost:90');
});
 