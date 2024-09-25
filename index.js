const express = require('express');
const bodyParser = require('body-parser');
const send_sms = require('./sendSMS');
const { addMember, memberExists, getAllMembers } = require('./firebase');
const { detectLanguage, responses, getCollectionDaysMessage} = require('./config/languageSupport');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getResponse(lang, action, name) {
    return responses[lang][action].replace("{name}", name);
}

// Handle incoming registration messages
app.post('/incoming-messages', async (req, res) => {
    const { text, from } = req.body;
    const lang = detectLanguage(text);
    const name = text.split(':')[1]?.trim();
    try {
        const exists = await memberExists(from);
        if (exists) { 
            await send_sms(from, responses[lang].alreadyRegistered.replace("{from}", from));
            return res.status(400).json({ message: 'Member already registered' });
        }
        else{
            if (!name) {
                await send_sms(from, responses[lang].missingName);
                return res.status(400).json({ message: 'Name missing in the registration message' });
            }
        }

        await addMember(name, from, lang);
        await send_sms(from, responses[lang].registered.replace("{name}", name));
        await send_sms(from, getCollectionDaysMessage(lang));
        res.status(200).json({ message: 'Member registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process the registration' });
    }
});

// Route to add a member manually (multi-language support)
app.post('/add-member', async (req, res) => {
    const { name, number, lang = 'en' } = req.body;

    if (!name || !number) {
        return res.status(400).json({ error: 'Name and number are required' });
    }

    try {
        const exists = await memberExists(number);
        if (exists) {
            return res.status(400).json({ error: 'Member already exists' });
        }

        await addMember(name, number, lang);
        await send_sms(number, getResponse(lang, 'registered', name));
        res.status(200).json({ message: 'Member added successfully' });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Failed to add member' });
    }
});

cron.schedule('0 8 * * SUN', async () => {
    console.log("Sending Sunday reminders for Monday collection");
    sendReminders('Monday');
});

cron.schedule('0 8 * * THU', async () => {
    console.log("Sending Thursday reminders for Friday collection");
    sendReminders('Friday');
});

// Function to send reminders
async function sendReminders(collectionDay) {
    try {
        const members = await getAllMembers();
        for (const { phone, lang } of members) {
            const message = {
                en: `Reminder: Waste collection day is ${collectionDay}.`,
                ha: `Tunatarwa: Ranar tara shara ita ce ${collectionDay}.`,
                yo: `Iranti: Ọjọ ikojọpọ idoti jẹ ${collectionDay}.`,
                pi: `Reminder: Waste collection day na ${collectionDay}.`,
                ig: `Ncheta: Ụbọchị ntọhapụ ihe mkpofu bụ ${collectionDay}.`
            }[lang];

            await send_sms(phone, message);
        }
    } catch (error) {
        console.error('Failed to send reminders:', error);
    }
}
// Handle sending reminders with multilingual support
app.post('/send-reminder', async (req, res) => {
    try {
        const members = await getAllMembers();

        for (const { phone, lang } of members) {
            const message = responses[lang].reminder;
            await send_sms(phone, message);
        }

        res.status(200).json({ message: 'Reminders sent to all members' });
        sendReminders('Monday');
        sendReminders('Friday');

    } catch (error) {
        res.status(500).json({ error: 'Failed to send reminders' });
    }
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
