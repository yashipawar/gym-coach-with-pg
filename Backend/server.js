require('dotenv').config();
const express = require('express');
const app = express();
const templateRoutes = require('./src/routes/templateRoutes');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/templates', templateRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to My Gym Coach API');
  });


app.get('/api', (req, res) => {
    res.json({ message: 'API is working' });
  });
  app.listen(5000, () => console.log('Server running on port 5000'));
