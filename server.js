// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json()); // For parsing application/json
// app.use(cors()); // To allow Cross-Origin requests (if you plan to call this API from a different domain)

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://sanjaykamath6969:HRh68yUbE4ASbdbA@cluster0.6cixo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Define a schema and model for payments
// const PaymentSchema = new mongoose.Schema({
//     seva: String,
//     amount: Number,
//     utr: String,
//     sevadharName: String, // Updated field name
//     contactNumber: String,
//     date: { type: Date, default: Date.now }
// });

// const Payment = mongoose.model('Payment', PaymentSchema);

// // POST route to save payment details
// app.post('/api/payments', async (req, res) => {
//     const { seva, amount, utr, sevadharName, contactNumber } = req.body; // Updated to sevadharName

//     try {
//         const newPayment = new Payment({ seva, amount, utr, sevadharName, contactNumber });
//         await newPayment.save();
//         res.status(200).json({ message: 'Payment saved successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to save payment' });
//     }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000')); // Start the server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Allow requests only from the Vercel frontend URL
const allowedOrigins = ['https://kudtherimahamayatemple.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://sanjaykamath6969:HRh68yUbE4ASbdbA@cluster0.6cixo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a schema and model for payments
const PaymentSchema = new mongoose.Schema({
    seva: String,
    amount: Number,
    utr: String,
    sevadharName: String,
    contactNumber: String,
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', PaymentSchema);

// POST route to save payment details
app.post('/api/payments', async (req, res) => {
    const { seva, amount, utr, sevadharName, contactNumber } = req.body;

    try {
        const newPayment = new Payment({ seva, amount, utr, sevadharName, contactNumber });
        await newPayment.save();
        res.status(200).json({ message: 'Payment saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save payment' });
    }
});

// Use Render's dynamic port and listen on all interfaces
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
