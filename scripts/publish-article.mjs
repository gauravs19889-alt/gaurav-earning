
import fs from "node:fs/promises";

const articles = [
  {
    category: "Online Earning",
    hi: "मोबाइल से ऑनलाइन कमाई के 5 तरीके",
    en: "5 Ways to Earn Online Using a Mobile",
    hindi: "मोबाइल से Freelancing, YouTube, Blogging, Online Teaching और Affiliate Marketing जैसे काम शुरू किए जा सकते हैं। पहले अपनी रुचि और कौशल पहचानें।\n\nकिसी भी काम में कमाई की गारंटी नहीं होती। शुरुआत में सीखने पर ध्यान दें और पैसे देने का वादा करने वाली संदिग्ध वेबसाइटों से बचें।",
    english: "You can explore freelancing, YouTube, blogging, online teaching and affiliate marketing using a mobile phone. Start by identifying your interests and skills.\n\nNo method guarantees income. Focus on learning first and avoid suspicious websites promising guaranteed returns."
  },
  {
    category: "Mobile Tips",
    hi: "मोबाइल की बैटरी बचाने के 7 तरीके",
    en: "7 Ways to Save Mobile Battery",
    hindi: "स्क्रीन की Brightness कम रखें, जरूरत न होने पर Bluetooth और GPS बंद करें तथा Battery Saver का इस्तेमाल करें। अनावश्यक Apps को Background में चलने से रोकें।\n\nमोबाइल को बहुत गर्म जगह पर न रखें और अच्छी गुणवत्ता वाले Charger का उपयोग करें।",
    english: "Reduce screen brightness, turn off Bluetooth and GPS when not needed, and use Battery Saver. Restrict unnecessary apps running in the background.\n\nAvoid excessive heat and use a good-quality charger."
  },
  {
    category: "Technology",
    hi: "Artificial Intelligence क्या है?",
    en: "What Is Artificial Intelligence?",
    hindi: "Artificial Intelligence यानी AI ऐसी तकनीक है जो कंप्यूटर को डेटा से सीखने और कुछ काम समझदारी से करने में मदद करती है। इसका उपयोग अनुवाद, शिक्षा, फोटो और जानकारी खोजने में होता है।\n\nAI के जवाब हमेशा सही नहीं होते। जरूरी जानकारी को विश्वसनीय स्रोत से जाँचें और निजी जानकारी साझा न करें।",
    english: "Artificial Intelligence is technology that helps computers learn from data and perform tasks such as translation, education support and information discovery.\n\nAI can make mistakes. Verify important information with reliable sources and avoid sharing private data."
  },
  {
    category: "Education",
    hi: "घर पर पढ़ाई का अच्छा टाइम टेबल कैसे बनाएँ",
    en: "How to Make a Good Study Timetable at Home",
    hindi: "पढ़ाई के लिए रोज़ एक निश्चित समय रखें। कठिन विषयों को उस समय पढ़ें जब आपका ध्यान सबसे अच्छा रहता हो। हर 30 से 45 मिनट बाद छोटा ब्रेक लें।\n\nरोज़ पढ़े हुए विषय को दोहराएँ और सप्ताह में एक बार अपनी तैयारी जाँचें।",
    english: "Set a fixed daily study time. Study difficult subjects when your concentration is strongest. Take short breaks after 30 to 45 minutes.\n\nRevise daily and review your progress once a week."
  },
  {
    category: "Personal Finance",
    hi: "हर महीने पैसे बचाने के आसान तरीके",
    en: "Simple Ways to Save Money Every Month",
    hindi: "महीने की शुरुआत में जरूरी खर्चों की सूची बनाएँ। आमदनी का कुछ हिस्सा बचत के लिए अलग रखें और गैर-जरूरी खरीदारी से पहले सोचें।\n\nछोटे खर्च भी लिखें। इससे पता चलेगा कि पैसा कहाँ खर्च हो रहा है। निवेश करने से पहले जोखिम और नियम समझें।",
    english: "List essential expenses at the beginning of each month. Set aside some money for savings and pause before making unnecessary purchases.\n\nTrack small expenses to understand where your money goes. Understand risks before investing."
  },
  {
    category: "Digital Safety",
    hi: "ऑनलाइन धोखाधड़ी से कैसे बचें",
    en: "How to Stay Safe from Online Scams",
    hindi: "OTP, UPI PIN और Password किसी के साथ साझा न करें। अनजान लिंक पर क्लिक न करें और पैसे प्राप्त करने के लिए UPI PIN न डालें।\n\nसंदिग्ध भुगतान या धोखाधड़ी होने पर तुरंत अपने बैंक से संपर्क करें और भारत के साइबर अपराध पोर्टल cybercrime.gov.in पर शिकायत करें।",
    english: "Never share your OTP, UPI PIN or password. Avoid unknown links. You do not need to enter your UPI PIN to receive money.\n\nIf you suspect fraud, contact your bank immediately and report it at cybercrime.gov.in."
  },
  {
    category: "Online Earning",
    hi: "Freelancing शुरू करने से पहले क्या सीखें",
    en: "What to Learn Before Starting Freelancing",
    hindi: "Freelancing के लिए Writing, Graphic Design, Video Editing या Excel जैसे कौशल सीख सकते हैं। अपने काम के कुछ नमूने तैयार करें और स्पष्ट प्रोफाइल बनाएँ।\n\nकाम मिलने से पहले किसी अनजान व्यक्ति को रजिस्ट्रेशन फीस न दें।",
    english: "You can learn writing, graphic design, video editing or Excel for freelancing. Prepare work samples and create a clear profile.\n\nDo not pay registration fees to unknown people promising work."
  },
  {
    category: "Mobile Tips",
    hi: "फोन की Storage खाली कैसे करें",
    en: "How to Free Up Phone Storage",
    hindi: "अनावश्यक Apps हटाएँ, Downloads फोल्डर जाँचें और बड़ी वीडियो फाइलों को सुरक्षित स्थान पर रखें। WhatsApp में बेकार मीडिया हटाने से भी जगह खाली हो सकती है।\n\nमहत्वपूर्ण फोटो या दस्तावेज़ हटाने से पहले उनका Backup जरूर लें।",
    english: "Remove unused apps, review your Downloads folder and move large videos to a safe location. Clearing unnecessary WhatsApp media can also free space.\n\nBack up important photos and documents before deleting them."
  },
  {
    category: "Technology",
    hi: "Cloud Storage क्या होता है",
    en: "What Is Cloud Storage?",
    hindi: "Cloud Storage में आपकी फाइलें इंटरनेट के जरिए ऑनलाइन सर्वर पर सुरक्षित रखी जाती हैं। इससे आप अलग-अलग डिवाइस से अपनी फाइलें खोल सकते हैं।\n\nमजबूत Password और Two-Step Verification का उपयोग करें। निजी फाइलों की Sharing Settings जाँचें।",
    english: "Cloud storage keeps files on online servers so you can access them from different devices.\n\nUse strong passwords and two-step verification. Review sharing settings for private files."
  },
  {
    category: "Education",
    hi: "अंग्रेज़ी बोलने का अभ्यास कैसे करें",
    en: "How to Practice Speaking English",
    hindi: "रोज़ 10 नए शब्द सीखें और छोटे वाक्य बोलने का अभ्यास करें। मोबाइल में अपनी आवाज रिकॉर्ड करके सुनें। गलतियों से घबराएँ नहीं।\n\nरोज़ थोड़ा अभ्यास करने से धीरे-धीरे आत्मविश्वास बढ़ सकता है।",
    english: "Learn ten new words daily and practise speaking short sentences. Record your voice and listen to it. Do not fear mistakes.\n\nRegular practice can gradually improve confidence."
  },
  {
    category: "Personal Finance",
    hi: "Emergency Fund क्यों जरूरी है",
    en: "Why Is an Emergency Fund Important?",
    hindi: "Emergency Fund अचानक आने वाले जरूरी खर्चों जैसे नौकरी में बदलाव, मरम्मत या चिकित्सा खर्च के लिए बचत होती है। इसे रोजमर्रा के खर्चों से अलग रखें।\n\nअपनी आय और जिम्मेदारियों के अनुसार धीरे-धीरे बचत बढ़ाएँ।",
    english: "An emergency fund helps cover unexpected essential expenses such as repairs or a job change. Keep it separate from everyday spending.\n\nBuild it gradually according to your income and responsibilities."
  },
  {
    category: "Digital Safety",
    hi: "मजबूत Password कैसे बनाएँ",
    en: "How to Create a Strong Password",
    hindi: "हर खाते के लिए अलग और लंबा Password रखें। नाम, जन्मतिथि या आसान नंबर इस्तेमाल न करें। Password Manager उपयोगी हो सकता है।\n\nजहाँ संभव हो Two-Factor Authentication चालू रखें और OTP किसी से साझा न करें।",
    english: "Use a long, unique password for each account. Avoid names, birthdays and predictable numbers. A password manager can help.\n\nEnable two-factor authentication where available and never share OTPs."
  }
];

const now = new Date();
const indiaDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(now);

const dayNumber = Math.floor(
  Date.parse(indiaDate + "T00:00:00Z") / 86400000
);

const article = articles[((dayNumber % articles.length) + articles.length) % articles.length];

let existing = { articles: [] };

try {
  existing = JSON.parse(await fs.readFile("articles.json", "utf8"));
} catch {}

if (!existing.articles.some(item => item.date === indiaDate)) {
  existing.articles.unshift({
    ...article,
    date: indiaDate
  });
}

await fs.writeFile(
  "articles.json",
  JSON.stringify({ updatedAt: now.toISOString(), articles: existing.articles }, null, 2)
);

console.log("Article published for " + indiaDate);
