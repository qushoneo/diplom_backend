import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';

const PORT = 5000;

const DB_URL = `mongodb+srv://Qushoneo:maps17171@cluster0.se24w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(express.json());
app.use('/api', router)



const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log('SERVER STARTED ON PORT ' + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
