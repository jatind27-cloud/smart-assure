// Contractor app strings in English, Hindi and Punjabi.
//
// Applicators and technicians on site are the people who use this app all day,
// often on a small phone in bright sun. Short words, no jargon, and the app
// opens in the language the person picked — Hindi by default here, because
// that is what most of the pilot crew in Pune reads fastest.

export type Lang = "hi" | "en" | "pa";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "hi", label: "हिंदी", short: "हि" },
  { code: "en", label: "English", short: "EN" },
  { code: "pa", label: "ਪੰਜਾਬੀ", short: "ਪੰ" },
];

export interface Strings {
  // shell
  appName: string;
  today: string;
  jobs: string;
  checklist: string;
  earnings: string;
  help: string;
  callSupervisor: string;
  // job header
  jobId: string;
  terrace: string;
  tierBadge: string;
  // verdict step
  stepLabel: string;
  chooseVerdict: string;
  chooseOne: string;
  vWater: string;
  vWaterSub: string;
  vPlumb: string;
  vPlumbSub: string;
  vStruct: string;
  vStructSub: string;
  // evidence
  photosTaken: string;
  readingsTaken: string;
  highPoints: string;
  // boq
  suggested: string;
  aiSuggest: string;
  checkEdit: string;
  // signature
  signTitle: string;
  signHint: string;
  signButton: string;
  signedButton: string;
  certNo: string;
  holdPassed: string;
  customerSees: string;
  // blocked
  quoteBlocked: string;
  blockedWhy: string;
  sendToCoe: string;
  // honest
  noSale: string;
  noSaleWhy: string;
  honestBonus: string;
  // misc
  back: string;
  payPerJob: string;
  // the three steps of the recommended system
  systemSteps: string[];
}

const en: Strings = {
  appName: "SmartCare Partner",
  today: "Today",
  jobs: "Jobs",
  checklist: "Checklist",
  earnings: "Earnings",
  help: "Help",
  callSupervisor: "Call supervisor",
  jobId: "Job",
  terrace: "Terrace, 280 sq ft",
  tierBadge: "T3 Technician",
  stepLabel: "Step 4 of 10",
  chooseVerdict: "What is the problem?",
  chooseOne: "Pick one. Be honest — you are paid either way.",
  vWater: "Waterproofing",
  vWaterSub: "Water is getting in. Go ahead with a quote.",
  vPlumb: "Plumbing or drainage",
  vPlumbSub: "Tell the customer. Do not sell waterproofing.",
  vStruct: "Structural",
  vStructSub: "Send it to the expert team. Do not start work.",
  photosTaken: "8 photos taken",
  readingsTaken: "8 readings taken",
  highPoints: "3 points above normal",
  suggested: "Suggested work",
  aiSuggest: "Suggested from your photos and readings",
  checkEdit: "Check each line. Change what is wrong.",
  signTitle: "Sign the report",
  signHint: "Tap the button below to sign",
  signButton: "Sign the report",
  signedButton: "Report signed",
  certNo: "Certificate no.",
  holdPassed: "Hold point 1 passed",
  customerSees: "The customer can see your verdict now.",
  quoteBlocked: "Quote blocked",
  blockedWhy: "This needs a structural engineer before any work starts.",
  sendToCoe: "Send to the expert team",
  noSale: "No waterproofing on this job",
  noSaleWhy: "Water is not coming through the surface. A coating will not fix it.",
  honestBonus: "Honest verdicts count towards your rating.",
  back: "Back",
  payPerJob: "₹1,450 for this job",
  systemSteps: [
    "Fill the cracks",
    "Tape the parapet joint",
    "Two coats of SmartCare Damp Proof",
  ],
};

const hi: Strings = {
  appName: "स्मार्टकेयर पार्टनर",
  today: "आज",
  jobs: "काम",
  checklist: "चेकलिस्ट",
  earnings: "कमाई",
  help: "मदद",
  callSupervisor: "सुपरवाइज़र को कॉल करें",
  jobId: "काम नंबर",
  terrace: "छत, 280 वर्ग फुट",
  tierBadge: "T3 टेक्नीशियन",
  stepLabel: "चरण 4 / 10",
  chooseVerdict: "समस्या क्या है?",
  chooseOne: "एक चुनें। सच बताएं — पैसे दोनों हालत में मिलेंगे।",
  vWater: "वॉटरप्रूफिंग",
  vWaterSub: "पानी अंदर आ रहा है। कोटेशन बनाएं।",
  vPlumb: "प्लंबिंग या ड्रेनेज",
  vPlumbSub: "ग्राहक को बताएं। वॉटरप्रूफिंग न बेचें।",
  vStruct: "स्ट्रक्चरल",
  vStructSub: "एक्सपर्ट टीम को भेजें। काम शुरू न करें।",
  photosTaken: "8 फ़ोटो ली गईं",
  readingsTaken: "8 रीडिंग ली गईं",
  highPoints: "3 जगह नमी ज़्यादा",
  suggested: "सुझाया गया काम",
  aiSuggest: "आपकी फ़ोटो और रीडिंग से सुझाया गया",
  checkEdit: "हर लाइन जाँचें। गलत हो तो बदलें।",
  signTitle: "रिपोर्ट पर साइन करें",
  signHint: "साइन करने के लिए नीचे दबाएं",
  signButton: "रिपोर्ट पर साइन करें",
  signedButton: "रिपोर्ट साइन हो गई",
  certNo: "सर्टिफिकेट नंबर",
  holdPassed: "होल्ड पॉइंट 1 पास",
  customerSees: "ग्राहक अब आपका नतीजा देख सकता है।",
  quoteBlocked: "कोटेशन रोका गया",
  blockedWhy: "काम शुरू करने से पहले स्ट्रक्चरल इंजीनियर की ज़रूरत है।",
  sendToCoe: "एक्सपर्ट टीम को भेजें",
  noSale: "इस काम में वॉटरप्रूफिंग नहीं",
  noSaleWhy: "पानी सतह से नहीं आ रहा। कोटिंग से ठीक नहीं होगा।",
  honestBonus: "सच बताने से आपकी रेटिंग बढ़ती है।",
  back: "पीछे",
  payPerJob: "इस काम के ₹1,450",
  systemSteps: [
    "दरारें भरें",
    "पैरापेट जोड़ पर टेप लगाएं",
    "स्मार्टकेयर डैम्प प्रूफ के दो कोट",
  ],
};

const pa: Strings = {
  appName: "ਸਮਾਰਟਕੇਅਰ ਪਾਰਟਨਰ",
  today: "ਅੱਜ",
  jobs: "ਕੰਮ",
  checklist: "ਚੈੱਕਲਿਸਟ",
  earnings: "ਕਮਾਈ",
  help: "ਮਦਦ",
  callSupervisor: "ਸੁਪਰਵਾਈਜ਼ਰ ਨੂੰ ਕਾਲ ਕਰੋ",
  jobId: "ਕੰਮ ਨੰਬਰ",
  terrace: "ਛੱਤ, 280 ਵਰਗ ਫੁੱਟ",
  tierBadge: "T3 ਟੈਕਨੀਸ਼ੀਅਨ",
  stepLabel: "ਪੜਾਅ 4 / 10",
  chooseVerdict: "ਸਮੱਸਿਆ ਕੀ ਹੈ?",
  chooseOne: "ਇੱਕ ਚੁਣੋ। ਸੱਚ ਦੱਸੋ — ਪੈਸੇ ਦੋਵੇਂ ਹਾਲਤਾਂ ਵਿੱਚ ਮਿਲਣਗੇ।",
  vWater: "ਵਾਟਰਪ੍ਰੂਫਿੰਗ",
  vWaterSub: "ਪਾਣੀ ਅੰਦਰ ਆ ਰਿਹਾ ਹੈ। ਕੋਟੇਸ਼ਨ ਬਣਾਓ।",
  vPlumb: "ਪਲੰਬਿੰਗ ਜਾਂ ਡਰੇਨੇਜ",
  vPlumbSub: "ਗਾਹਕ ਨੂੰ ਦੱਸੋ। ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਨਾ ਵੇਚੋ।",
  vStruct: "ਸਟ੍ਰਕਚਰਲ",
  vStructSub: "ਮਾਹਰ ਟੀਮ ਨੂੰ ਭੇਜੋ। ਕੰਮ ਸ਼ੁਰੂ ਨਾ ਕਰੋ।",
  photosTaken: "8 ਫ਼ੋਟੋ ਲਈਆਂ",
  readingsTaken: "8 ਰੀਡਿੰਗ ਲਈਆਂ",
  highPoints: "3 ਥਾਂ ਨਮੀ ਵੱਧ",
  suggested: "ਸੁਝਾਇਆ ਕੰਮ",
  aiSuggest: "ਤੁਹਾਡੀਆਂ ਫ਼ੋਟੋ ਅਤੇ ਰੀਡਿੰਗ ਤੋਂ ਸੁਝਾਇਆ",
  checkEdit: "ਹਰ ਲਾਈਨ ਜਾਂਚੋ। ਗਲਤ ਹੋਵੇ ਤਾਂ ਬਦਲੋ।",
  signTitle: "ਰਿਪੋਰਟ 'ਤੇ ਸਾਈਨ ਕਰੋ",
  signHint: "ਸਾਈਨ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਬਾਓ",
  signButton: "ਰਿਪੋਰਟ 'ਤੇ ਸਾਈਨ ਕਰੋ",
  signedButton: "ਰਿਪੋਰਟ ਸਾਈਨ ਹੋ ਗਈ",
  certNo: "ਸਰਟੀਫਿਕੇਟ ਨੰਬਰ",
  holdPassed: "ਹੋਲਡ ਪੁਆਇੰਟ 1 ਪਾਸ",
  customerSees: "ਗਾਹਕ ਹੁਣ ਤੁਹਾਡਾ ਨਤੀਜਾ ਦੇਖ ਸਕਦਾ ਹੈ।",
  quoteBlocked: "ਕੋਟੇਸ਼ਨ ਰੋਕਿਆ ਗਿਆ",
  blockedWhy: "ਕੰਮ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਟ੍ਰਕਚਰਲ ਇੰਜੀਨੀਅਰ ਦੀ ਲੋੜ ਹੈ।",
  sendToCoe: "ਮਾਹਰ ਟੀਮ ਨੂੰ ਭੇਜੋ",
  noSale: "ਇਸ ਕੰਮ ਵਿੱਚ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਨਹੀਂ",
  noSaleWhy: "ਪਾਣੀ ਸਤਹ ਤੋਂ ਨਹੀਂ ਆ ਰਿਹਾ। ਕੋਟਿੰਗ ਨਾਲ ਠੀਕ ਨਹੀਂ ਹੋਵੇਗਾ।",
  honestBonus: "ਸੱਚ ਦੱਸਣ ਨਾਲ ਤੁਹਾਡੀ ਰੇਟਿੰਗ ਵਧਦੀ ਹੈ।",
  back: "ਪਿੱਛੇ",
  payPerJob: "ਇਸ ਕੰਮ ਦੇ ₹1,450",
  systemSteps: [
    "ਤਰੇੜਾਂ ਭਰੋ",
    "ਪੈਰਾਪੈਟ ਜੋੜ 'ਤੇ ਟੇਪ ਲਗਾਓ",
    "ਸਮਾਰਟਕੇਅਰ ਡੈਂਪ ਪਰੂਫ ਦੇ ਦੋ ਕੋਟ",
  ],
};

export const STRINGS: Record<Lang, Strings> = { en, hi, pa };
