let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./db');

const BookRoute = require('./BookRoute')
const UsersRoute = require('./UsersRoute')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
  console.log('Database connected!')
},
error => {
    console.log(error)
  }
)

const app = express();
app.use(express.urlencoded({ extended: true }));
var  jsonParser = app.use(express.json());

app.use(cors());
app.use('/', BookRoute)
app.use('/user',UsersRoute)


const port = 8000 ;
const server = app.listen(port, () => {
  console.log('Connected on : ' + port)
})

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});