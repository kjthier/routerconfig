import express from 'express';
import userRoutes from './routes/users.js';
import connectDB from './client.js'

// Load environment variables from .env file
import 'dotenv/config';

const app = express();

app.use(express.json());

// connect to database
connectDB();

// Define your routes and other application logic here
app.get('/', (req, res) => {
  res.send('Router Config Project')
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

app.use('/users', userRoutes);
