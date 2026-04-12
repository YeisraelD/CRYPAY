const Payment = require('./models/payment');
const Feedback = require('./models/Feedback');

// ... (existing router definitions)

paymentsRouter.post('/create', validate(['price', 'info', 'id']), async (req, res) => {
    const { price, info, id } = req.body;
    try {
        const newPayment = await Payment.create({
            paymentId: id,
            price: price,
            info: info
        });
        res.json({ res: "success" });
    } catch (err) {
        res.status(500).json({ res: "fail", error: err.message });
    }
});

paymentsRouter.post('/get', validate(['id']), async (req, res) => {
    const { id } = req.body;
    const payment = await Payment.findOne({ paymentId: id });
    if (payment) {
        res.json({ res: "success", body: payment });
    } else {
        res.json({ res: "fail" });
    }
});

app.post('/feedback', validate(['feedback']), async (req, res) => {
    try {
        await Feedback.create({
            feedbackId: uuidv4(),
            content: req.body.feedback
        });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
