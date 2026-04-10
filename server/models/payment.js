const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    info: { type: Object, required: true },
    status: {
        type: String,
        enum: ['CREATED', 'PENDING', 'COMPLETED', 'FAILED'],
        default: 'CREATED'
    },
    txHash: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
