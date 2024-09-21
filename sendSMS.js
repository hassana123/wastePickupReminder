// sendSMS.js
const africastalking = require('africastalking');
require('dotenv').config();

const apiKey = process.env.AT_API_KEY;
const username = process.env.AT_USERNAME;
const shortCode = process.env.AT_SHORT_CODE;

const at = africastalking({ apiKey, username });
const sms = at.SMS;

function send_sms(toNumbers, message) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(toNumbers)) {
            toNumbers = [toNumbers];
        }

        sms.send({ to: toNumbers, message, from: shortCode })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

module.exports = send_sms;
