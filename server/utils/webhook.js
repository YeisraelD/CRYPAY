const axios = require('axios');

/**
 * Sends a notification to the merchant's webhook URL
 * @param {string} url - The destination URL
 * @param {object} payload - The payment data to send
 */
const sendWebhook = async (url, payload) => {
    if (!url) return;

    try {
        console.log(`📡 Sending webhook to: ${url}`);
        const response = await axios.post(url, payload, {
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`✅ Webhook delivered: status ${response.status}`);
    } catch (error) {
        console.error(`❌ Webhook failed: ${error.message}`);
    }
};

module.exports = { sendWebhook };
