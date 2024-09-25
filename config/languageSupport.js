// Supported language keywords for registration
const languageKeywords = {
    en: "REGISTER",
    ha: "RAJISTA",
    yo: "FORIJI",
    pi: "REGISTER ME",
    ig: "DEBANYERE"
};

// Response templates for different languages
const responses = {
    en: {
        missingName: "Please include your name after REGISTER. Example: REGISTER: John Doe",
        alreadyRegistered: "Hi {from}, your number is already registered.",
        registered: "Welcome {name}, you have been registered for waste collection reminders.",
        reminder: "Reminder: Your waste collection day is tomorrow.",
        unknownCommand: "Sorry, I didn't understand your message. To register, text REGISTER: YourName."
    },
    ha: {
        missingName: "Da fatan za ka saka sunanka bayan RAJISTA. Misali: RAJISTA: John Doe",
        alreadyRegistered: "Sannu {from}, namba ya riga an yi rajista.",
        registered: "Maraba {name}, an rajista don tunatarwa game da tara shara.",
        reminder: "Tunatarwa: Ranar tara shara gobe ce.",
        unknownCommand: "Ba mu gane saƙonku ba. Don yin rajista, aiko da RAJISTA: Sunanka."
    },
    yo: {
        missingName: "Jọwọ fi orukọ rẹ lelẹ lẹhin FORIJI. Apẹẹrẹ: FORIJI: John Doe",
        alreadyRegistered: "Bawo {from}, o ti fi number re sile tẹlẹ.",
        registered: "Kaabo {name}, o ti forukọsilẹ fun iranti ikojọpọ idoti.",
        reminder: "Iranti: Ọjọ ikojọpọ idoti rẹ ni ọla.",
        unknownCommand: "A ko le ye ifiranṣẹ rẹ. Lati forukọsilẹ, fi FORIJI: Orukọ rẹ ranṣẹ."
    },
    pi: {
        missingName: "Abeg add your name afta REGISTER. Example: REGISTER ME: John Doe",
        alreadyRegistered: "Oga {from}, you don already register.",
        registered: "Welcome {name}, you don register for waste collection reminder.",
        reminder: "Reminder: Waste collection day na tomorrow.",
        unknownCommand: "Oga, we no understand your message. To register, text REGISTER ME: YourName."
    },
    ig: {
        missingName: "Biko tinye aha gi mgbe DEBANYERE. Omume: DEBANYERE: John Doe",
        alreadyRegistered: "Ndewo {from}, i debanyela onwe gi.",
        registered: "Nnọọ {name}, e debanyere gi maka ncheta ịchịkọta nsị.",
        reminder: "Ncheta: Ezi ntụgharị na-abịa echi.",
        unknownCommand: "Anaghị m aghọta ozi gị. Iji debanye aha, zipu DEBANYERE: Aha gị."
    }
};

// Function to detect language based on the command
function detectLanguage(text) {
    const upperText = text.toUpperCase();
    for (const lang in languageKeywords) {
        if (upperText.startsWith(languageKeywords[lang])) return lang;
    }
    return 'en'; // Default to English
}
function getCollectionDaysMessage(lang) {
    return {
        en: "Waste collection days are Monday and Friday. You will receive reminders a day before that is (Sunday and Thursday).",
        ha: "Ranar tara shara ita ce Litinin da Juma'a. Za ku karɓi tunatarwa ranar da ta gabata (Lahadi da Alhamis).",
        yo: "Ọjọ ikojọpọ idoti jẹ Mọnde ati Furaidee. Iwọ yoo gba iranti ọjọ kan ṣaaju (Sunday ati Thursday).",
        pi: "Waste collection day na Monday and Friday. You go get reminder one day before wey be (Sunday and Thursday).",
        ig: "Ụbọchị ntọhapụ ihe mkpofu bụ Mọnde na Fraịdee. Ị ga-anata ncheta otu ụbọchị tupu (Sọnde na Tọọzdee)."
    }[lang];
}

module.exports = { languageKeywords, responses, detectLanguage, getCollectionDaysMessage };
