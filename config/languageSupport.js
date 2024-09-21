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
        alreadyRegistered: "Hi {name}, you are already registered.",
        registered: "Welcome {name}, you have been registered for waste collection reminders.",
        reminder: "Reminder: Your waste collection day is tomorrow.",
        unknownCommand: "Sorry, I didn't understand your message. To register, text REGISTER: YourName."
    },
    ha: {
        missingName: "Da fatan za ka saka sunanka bayan RAJISTA. Misali: RAJISTA: John Doe",
        alreadyRegistered: "Sannu {name}, ka riga ka yi rajista.",
        registered: "Maraba {name}, an rajista don tunatarwa game da tara shara.",
        reminder: "Tunatarwa: Ranar tara shara gobe ce.",
        unknownCommand: "Ba mu gane saƙonku ba. Don yin rajista, aiko da RAJISTA: Sunanka."
    },
    yo: {
        missingName: "Jọwọ fi orukọ rẹ lelẹ lẹhin FORIJI. Apẹẹrẹ: FORIJI: John Doe",
        alreadyRegistered: "Bawo {name}, o ti forukọsilẹ tẹlẹ.",
        registered: "Kaabo {name}, o ti forukọsilẹ fun iranti ikojọpọ idoti.",
        reminder: "Iranti: Ọjọ ikojọpọ idoti rẹ ni ọla.",
        unknownCommand: "A ko le ye ifiranṣẹ rẹ. Lati forukọsilẹ, fi FORIJI: Orukọ rẹ ranṣẹ."
    },
    pi: {
        missingName: "Abeg add your name afta REGISTER. Example: REGISTER ME: John Doe",
        alreadyRegistered: "Oga {name}, you don already register.",
        registered: "Welcome {name}, you don register for waste collection reminder.",
        reminder: "Reminder: Waste collection day na tomorrow.",
        unknownCommand: "Oga, we no understand your message. To register, text REGISTER ME: YourName."
    },
    ig: {
        missingName: "Biko tinye aha gi mgbe DEBANYERE. Omume: DEBANYERE: John Doe",
        alreadyRegistered: "Ndewo {name}, i debanyela onwe gi.",
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

module.exports = { languageKeywords, responses, detectLanguage };
