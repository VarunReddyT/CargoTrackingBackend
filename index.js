const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const shipmentRoutes = require('./routes/shipment');

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/', shipmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});