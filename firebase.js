// firebase.js
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./config/firebase-private-key.json');

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

// Add a member to the Firestore database
function addMember(name, number, lang) {
    let phone = number
    return db.collection('members').doc(number).set({ name, lang, phone });
}

// Check if a member already exists
function memberExists(number) {
    return db.collection('members').doc(number).get().then(doc => doc.exists);
}

async function getAllMembers() {
    const snapshot = await db.collection('members').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = { addMember, memberExists, getAllMembers};
