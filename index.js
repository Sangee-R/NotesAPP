const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const  mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const noteRoutes = require('./routes/noteRoutes');

const app = express();





// database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser :true,
    useUnifiedTopology:true,
})
.then(() => { 
    console.log("Connected to MongoDB!");
})
 .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// middleware
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    credentials: true,
    origin:'https://os-notesapp.netlify.app',
}));
app.use(express.json());


// routes
app.use('/', require('./routes/authRoutes'));
// Use the noteRoutes
app.use('/notes', noteRoutes);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))