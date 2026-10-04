export interface PlaybookStep {
  title: string;
  description: string;
  action?: string;
  warning?: string;
  contact?: string;
}

export interface Playbook {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  icon: string;
  description: string;
  descriptionHi: string;
  urgency: "low" | "medium" | "high" | "emergency";
  steps: PlaybookStep[];
  legalBasis: string[];
  importantNumbers: { name: string; number: string }[];
}

export const PLAYBOOKS: Playbook[] = [
  {
    id: "police-stop",
    title: "Stopped by Police",
    titleHi: "पुलिस ने रोका",
    category: "criminal",
    icon: "🚔",
    description: "Know your rights when stopped, questioned, or detained by police",
    descriptionHi: "जब पुलिस आपको रोके, पूछताछ करे या हिरासत में ले तो अपने अधिकार जानें",
    urgency: "emergency",
    steps: [
      { title: "Stay calm and cooperate", description: "Do not resist or argue. Be polite but firm about your rights. You have the right to remain silent beyond providing your name and address." },
      { title: "Ask for identification", description: "You have the right to know the officer's name, designation, and police station. Ask politely: 'May I know your name and badge number?'" },
      { title: "Know your arrest rights", description: "Police MUST inform you of the grounds of arrest (BNS Section 47 / BNSS Section 35). You cannot be arrested without a warrant for bailable offences. If arrested, you must be produced before a magistrate within 24 hours (Article 22 of Constitution)." },
      { title: "Right to inform someone", description: "You have the right to inform a friend, relative, or lawyer about your arrest immediately (BNSS Section 36). Police must facilitate this.", warning: "Police cannot deny you this right." },
      { title: "Right to legal aid", description: "You have the right to free legal aid if you cannot afford a lawyer (Article 39A of Constitution). Ask for a lawyer from the District Legal Services Authority.", contact: "NALSA: 15100" },
      { title: "Do not sign blank papers", description: "NEVER sign any blank paper or document you haven't read. You have the right to read everything before signing.", warning: "Signing blank papers can be used against you." },
      { title: "Women-specific rights", description: "Women cannot be arrested after sunset and before sunrise except in exceptional circumstances and with a female officer present. Women must be held separately from male detainees.", contact: "Women Helpline: 181" },
      { title: "Document everything", description: "After the encounter, write down everything: time, place, officers' names, what was said, any witnesses. This may be crucial evidence if you need to file a complaint later." },
    ],
    legalBasis: ["Article 22 — Right against arrest and detention", "BNSS Section 35 — Arrested person must be informed of grounds", "BNSS Section 36 — Right to inform friend/relative", "BNS Section 173 — False information to public servant"],
    importantNumbers: [{ name: "Police", number: "100" }, { name: "NALSA", number: "15100" }, { name: "Emergency", number: "112" }],
  },
  {
    id: "landlord-deposit",
    title: "Landlord Won't Return Deposit",
    titleHi: "मकान मालिक जमानत राशि नहीं लौटा रहा",
    category: "tenant",
    icon: "🏠",
    description: "Steps to recover your security deposit from a landlord",
    descriptionHi: "मकान मालिक से अपनी जमानत राशि वापस पाने के कदम",
    urgency: "medium",
    steps: [
      { title: "Gather your documents", description: "Collect: rental agreement, rent receipts, security deposit receipt, photos/videos of property condition when you left, any WhatsApp/email communication with landlord." },
      { title: "Send a written demand", description: "Send a formal written letter (by registered post or email) demanding return of deposit within 15 days. Keep proof of sending. State the amount, date of vacancy, and that the property was returned in good condition." },
      { title: "Send a legal notice", description: "If the landlord doesn't respond within 15 days, send a legal notice through an advocate. This costs Rs 500-2000 typically. You can also draft one yourself using CitizenShield AI's Document Generator.", action: "Generate Legal Notice" },
      { title: "File with Rent Authority", description: "File a complaint with the Rent Controller/Rent Authority/Rent Tribunal in your city. Under the Model Tenancy Act, the deposit must be returned within 1 month of vacancy." },
      { title: "Alternative: Consumer Forum", description: "You can also file a consumer complaint on edaakhil.nic.in (e-Daakhil). Fee is minimal (Rs 200-500 based on claim). Landlord-tenant relationship is considered a 'service'.", action: "Draft Consumer Complaint" },
      { title: "Free legal aid option", description: "If you cannot afford a lawyer, contact DLSA (District Legal Services Authority) for free legal aid. You're eligible if your annual income is below Rs 3 lakh.", contact: "NALSA: 15100" },
    ],
    legalBasis: ["Model Tenancy Act 2021 — Section 7 & 8", "Consumer Protection Act 2019 — Section 35", "Transfer of Property Act — Section 108"],
    importantNumbers: [{ name: "Consumer Helpline", number: "1800-11-4000" }, { name: "NALSA", number: "15100" }, { name: "e-Daakhil", number: "edaakhil.nic.in" }],
  },
  {
    id: "workplace-termination",
    title: "Wrongful Termination",
    titleHi: "गलत तरीके से नौकरी से निकाला",
    category: "workplace",
    icon: "💼",
    description: "Your rights if fired unfairly or without proper notice",
    descriptionHi: "अगर अनुचित तरीके से या बिना नोटिस के नौकरी से निकाला गया",
    urgency: "high",
    steps: [
      { title: "Save all evidence immediately", description: "Before you lose access: screenshot your termination letter/email, download pay slips, save HR communications, note dates of employment, collect appointment letter and any performance reviews." },
      { title: "Check your notice period entitlement", description: "As per your appointment letter or standing orders, you're typically entitled to 1-3 months notice or pay in lieu. If terminated without notice, you can claim notice period wages." },
      { title: "Check PF and gratuity", description: "If you've worked 5+ years, you're entitled to gratuity (15 days wages per year of service). Your PF must be settled. Check your PF balance at epfindia.gov.in or call EPFO helpline.", contact: "EPFO: 1800-118-005" },
      { title: "Raise internal grievance", description: "Send a formal written grievance to HR and your manager citing unfair termination. Keep a copy. This creates a paper trail." },
      { title: "Approach Labour Commissioner", description: "File a complaint with the Labour Commissioner if: you weren't given proper notice, wages are pending, PF/gratuity not paid, or termination violated procedure.", contact: "Labour Helpline: 14434" },
      { title: "Consider Industrial Disputes Act", description: "If you're a 'workman' (non-managerial) and the company has 100+ employees, retrenchment requires government permission. Without it, the termination may be illegal." },
      { title: "Get free legal help", description: "Contact DLSA for free legal aid. You can also approach labour courts directly for reinstatement or compensation.", contact: "NALSA: 15100" },
    ],
    legalBasis: ["Industrial Disputes Act 1947 — Section 25F, 25G, 25H", "Payment of Gratuity Act 1972", "EPF Act 1952", "Shops and Establishments Act (state-specific)"],
    importantNumbers: [{ name: "Labour Helpline", number: "14434" }, { name: "EPFO", number: "1800-118-005" }, { name: "NALSA", number: "15100" }],
  },
  {
    id: "consumer-defective",
    title: "Defective Product / Bad Service",
    titleHi: "खराब उत्पाद / खराब सेवा",
    category: "consumer",
    icon: "🛒",
    description: "How to get a refund, replacement, or compensation for defective goods",
    descriptionHi: "खराब सामान के लिए रिफंड, रिप्लेसमेंट या मुआवजा कैसे पाएं",
    urgency: "medium",
    steps: [
      { title: "Document the defect", description: "Take photos/videos of the defective product. Keep the bill, warranty card, packaging, and any communication with the seller." },
      { title: "Contact the seller/company first", description: "Send a written complaint (email preferred for proof) to the seller and the manufacturer. Give them 15 days to respond. Many issues get resolved at this stage." },
      { title: "Call Consumer Helpline", description: "Call 1800-11-4000 (toll-free) or 1915. They can mediate between you and the company and often resolve issues quickly.", contact: "Consumer Helpline: 1800-11-4000" },
      { title: "File online complaint", description: "File on the National Consumer Helpline portal (consumerhelpline.gov.in) or directly on e-Daakhil (edaakhil.nic.in) for the consumer forum.", action: "Draft Consumer Complaint" },
      { title: "Consumer Forum filing", description: "District Forum handles claims up to Rs 1 crore. Fee: Rs 200-500 for most claims. You don't need a lawyer — you can argue your own case. File within 2 years of the problem." },
      { title: "What you can claim", description: "Refund or replacement, compensation for loss/injury, litigation costs, and punitive damages for negligence. Interest on delayed refunds is also common." },
    ],
    legalBasis: ["Consumer Protection Act 2019 — Sections 2(9), 34, 35", "Consumer Protection (E-Commerce) Rules 2020"],
    importantNumbers: [{ name: "Consumer Helpline", number: "1800-11-4000" }, { name: "e-Daakhil", number: "edaakhil.nic.in" }],
  },
  {
    id: "domestic-violence",
    title: "Domestic Violence",
    titleHi: "घरेलू हिंसा",
    category: "criminal",
    icon: "🛡️",
    description: "Immediate safety steps and legal options for domestic violence",
    descriptionHi: "घरेलू हिंसा के लिए तत्काल सुरक्षा कदम और कानूनी विकल्प",
    urgency: "emergency",
    steps: [
      { title: "Ensure your immediate safety", description: "If you are in immediate danger, call 100 (Police) or 112 (Emergency). Go to a safe location — a trusted friend, relative, or One Stop Centre.", warning: "Your physical safety is the top priority. All legal steps can wait until you are safe.", contact: "Emergency: 112" },
      { title: "Call Women Helpline", description: "Call 181 for immediate support, counseling, and information about shelters and legal options. Available 24/7 in most states.", contact: "Women Helpline: 181" },
      { title: "File an FIR", description: "Go to the nearest police station and file an FIR under BNS Section 85 (cruelty by husband/relatives). If dowry is involved, BNS Section 76 applies. Police MUST register your FIR — refusal is a punishable offence." },
      { title: "Protection Order", description: "Under the Domestic Violence Act 2005, you can get a Protection Order from a magistrate. This prevents the abuser from contacting you, entering your home, or disposing of shared assets. Apply through Protection Officer or directly in court." },
      { title: "Right to Residence", description: "You have the right to live in the shared household regardless of ownership (Section 17, DV Act). The abuser cannot force you to leave." },
      { title: "Maintenance and compensation", description: "You can claim monetary relief for expenses, damages, and maintenance for yourself and children under the DV Act." },
      { title: "Free legal aid", description: "You are entitled to free legal aid. Contact your District Legal Services Authority or call NALSA.", contact: "NALSA: 15100" },
    ],
    legalBasis: ["Protection of Women from Domestic Violence Act 2005", "BNS Section 85 (replaces IPC 498A)", "BNS Section 76 (Dowry death)", "Hindu Marriage Act / relevant personal law"],
    importantNumbers: [{ name: "Women Helpline", number: "181" }, { name: "Police", number: "100" }, { name: "Emergency", number: "112" }, { name: "NALSA", number: "15100" }],
  },
  {
    id: "cheque-bounce",
    title: "Cheque Bounced",
    titleHi: "चेक बाउंस",
    category: "financial",
    icon: "📄",
    description: "Legal steps when someone's cheque to you bounces",
    descriptionHi: "जब किसी का चेक बाउंस हो जाए तो कानूनी कदम",
    urgency: "medium",
    steps: [
      { title: "Get the bank memo", description: "Collect the cheque return memo from your bank stating the reason for dishonour (e.g., insufficient funds). This is essential evidence." },
      { title: "Send legal notice within 30 days", description: "You MUST send a written demand notice to the cheque issuer within 30 days of receiving the return memo. Demand payment of the cheque amount. Send by registered post/speed post.", warning: "Missing the 30-day deadline means you lose the right to prosecute under Section 138." },
      { title: "Wait 15 days for payment", description: "The issuer has 15 days from receiving your notice to make the payment. If they pay, the matter is resolved." },
      { title: "File complaint within 30 days", description: "If the issuer doesn't pay within 15 days, file a criminal complaint under Section 138 of the Negotiable Instruments Act in the magistrate court within 30 days of the 15-day notice expiry." },
      { title: "Court proceedings", description: "The court can award: the cheque amount, interest, compensation up to twice the cheque amount, and court costs. The issuer faces up to 2 years imprisonment." },
    ],
    legalBasis: ["Negotiable Instruments Act 1881 — Section 138", "NI Act — Section 141 (company liability)", "NI Act — Section 142 (cognizance timeline)"],
    importantNumbers: [{ name: "NALSA", number: "15100" }, { name: "e-Courts", number: "ecourts.gov.in" }],
  },
  {
    id: "cyber-fraud",
    title: "Online/UPI Fraud",
    titleHi: "ऑनलाइन/UPI धोखाधड़ी",
    category: "cyber",
    icon: "🔒",
    description: "Immediate steps after online payment fraud or hacking",
    descriptionHi: "ऑनलाइन भुगतान धोखाधड़ी या हैकिंग के बाद तत्काल कदम",
    urgency: "high",
    steps: [
      { title: "Act within the first hour", description: "Speed is critical. Call 1930 (Cyber Crime Helpline) immediately. Also call your bank's customer care to block your card/account. The faster you report, the higher the chance of recovering funds.", warning: "Banks can reverse fraudulent transactions if reported within 3 working days.", contact: "Cyber Crime: 1930" },
      { title: "File complaint on cybercrime portal", description: "Go to cybercrime.gov.in and file a detailed complaint. Upload all evidence: transaction screenshots, SMS alerts, emails, chat screenshots. Note down the complaint number." },
      { title: "Report to your bank in writing", description: "Send a written complaint to your bank branch and email to the nodal officer. Under RBI guidelines, your liability is zero if you report unauthorized transactions within 3 days." },
      { title: "File an FIR", description: "File an FIR at your local police station under IT Act Section 66C (identity theft) and 66D (cheating by personation). Bring all evidence printouts." },
      { title: "File with RBI Ombudsman", description: "If the bank doesn't resolve within 30 days, file a complaint with the RBI Banking Ombudsman at cms.rbi.org.in.", contact: "RBI Ombudsman: cms.rbi.org.in" },
      { title: "Preserve all evidence", description: "Screenshot everything. Don't delete any messages, emails, or call records related to the fraud. Save transaction IDs, timestamps, and the fraudster's contact details if known." },
    ],
    legalBasis: ["IT Act 2000 — Section 66C, 66D", "BNS Section 318 (Cheating)", "RBI Master Direction on Digital Payment Security"],
    importantNumbers: [{ name: "Cyber Crime", number: "1930" }, { name: "RBI Ombudsman", number: "cms.rbi.org.in" }],
  },
  {
    id: "rti-filing",
    title: "File an RTI Application",
    titleHi: "RTI आवेदन दायर करें",
    category: "civic",
    icon: "📋",
    description: "How to use the Right to Information Act to get government information",
    descriptionHi: "सरकारी जानकारी प्राप्त करने के लिए सूचना का अधिकार अधिनियम का उपयोग कैसे करें",
    urgency: "low",
    steps: [
      { title: "Identify the department", description: "Figure out which government department holds the information you want. Check the department's website for the Public Information Officer (PIO) name and address." },
      { title: "Draft your application", description: "Write: 'I wish to seek the following information under the Right to Information Act, 2005.' Then list your specific questions. Be precise — vague questions get vague answers.", action: "Generate RTI Application" },
      { title: "Pay the fee", description: "Central government: Rs 10. State government: varies (Rs 10-50). Pay via Indian Postal Order, DD, or online at rtionline.gov.in. BPL card holders are exempt." },
      { title: "Submit the application", description: "Submit in person, by post (registered), or online at rtionline.gov.in (for central government). Keep proof of submission." },
      { title: "Wait for response", description: "The PIO must respond within 30 days (48 hours if it concerns life or liberty). If no response or unsatisfactory response, file a First Appeal." },
      { title: "First Appeal (if needed)", description: "File within 30 days to the First Appellate Authority (senior officer in the same department). No additional fee." },
      { title: "Second Appeal (if still unsatisfied)", description: "File within 90 days to the Central/State Information Commission. The Commission can impose penalties of Rs 250/day up to Rs 25,000 on the PIO for non-compliance." },
    ],
    legalBasis: ["Right to Information Act 2005 — Sections 6, 7, 8, 19, 20"],
    importantNumbers: [{ name: "RTI Online Portal", number: "rtionline.gov.in" }, { name: "CIC", number: "cic.gov.in" }],
  },
  {
    id: "sexual-harassment-workplace",
    title: "Sexual Harassment at Workplace",
    titleHi: "कार्यस्थल पर यौन उत्पीड़न",
    category: "workplace",
    icon: "⚠️",
    description: "Your rights and steps to report workplace sexual harassment",
    descriptionHi: "कार्यस्थल पर यौन उत्पीड़न की रिपोर्ट करने के अधिकार और कदम",
    urgency: "high",
    steps: [
      { title: "Know what counts as sexual harassment", description: "Physical contact, demand for sexual favours, sexually coloured remarks, showing pornography, any unwelcome sexual behaviour — verbal, non-verbal, or physical. Even WhatsApp messages count." },
      { title: "Document everything", description: "Save screenshots, emails, messages. Note dates, times, witnesses. Write down what happened as soon as possible while details are fresh." },
      { title: "File complaint with ICC", description: "Every workplace with 10+ employees MUST have an Internal Complaints Committee (ICC). File a written complaint within 3 months of the incident. The ICC must complete inquiry within 90 days.", warning: "If there's no ICC, the employer is violating the law. Report to the District Officer." },
      { title: "If ICC doesn't exist or act", description: "File complaint with the Local Complaints Committee (LCC) set up by the District Officer. Also report the employer's non-compliance to the labour department." },
      { title: "File FIR if warranted", description: "For serious cases (assault, stalking, voyeurism), file an FIR under BNS Sections 63-66 (sexual harassment, assault, voyeurism, stalking). This is separate from the ICC complaint.", contact: "Women Helpline: 181" },
      { title: "Protection during inquiry", description: "You can request: transfer (yours or the accused), leave, restraining the accused from reporting on your work. The ICC must ensure no retaliation." },
      { title: "Free legal support", description: "Contact your State Women's Commission or DLSA for free legal aid and counseling.", contact: "NCW: 7827-170-170" },
    ],
    legalBasis: ["POSH Act 2013 (Prevention of Sexual Harassment at Workplace)", "BNS Sections 63-66", "Vishaka Guidelines (Supreme Court)"],
    importantNumbers: [{ name: "Women Helpline", number: "181" }, { name: "NCW", number: "7827-170-170" }, { name: "NALSA", number: "15100" }],
  },
  {
    id: "accident-road",
    title: "Road Accident",
    titleHi: "सड़क दुर्घटना",
    category: "emergency",
    icon: "🚗",
    description: "Immediate steps and legal rights after a road accident",
    descriptionHi: "सड़क दुर्घटना के बाद तत्काल कदम और कानूनी अधिकार",
    urgency: "emergency",
    steps: [
      { title: "Call emergency services", description: "Call 108 (ambulance) and 100 (police) immediately. If the injured person is in critical condition, any bystander can take them to the nearest hospital. The hospital MUST treat them — refusing is a crime.", contact: "Ambulance: 108" },
      { title: "Good Samaritan protection", description: "If you help an accident victim, you are protected by the Good Samaritan Law (Supreme Court guidelines). You cannot be harassed by police or hospital for helping. No one can demand payment for help rendered." },
      { title: "Document the scene", description: "Take photos of: the accident scene, vehicle positions, number plates, damage, road conditions, traffic signals, and any visible injuries. Get contact details of witnesses." },
      { title: "File FIR", description: "Ensure an FIR is filed. If police are not cooperative, you can file at any police station (Zero FIR) and it will be transferred. You can also file online in many states." },
      { title: "Medical treatment rights", description: "Government and private hospitals near the accident site MUST provide free treatment for the first 48 hours (Cashless Treatment under Motor Vehicles Act). Insurance covers treatment." },
      { title: "Claim compensation", description: "File a claim with the Motor Accident Claims Tribunal (MACT). You can claim: medical expenses, loss of income, permanent disability compensation, pain and suffering, vehicle damage.", contact: "NALSA: 15100" },
      { title: "Insurance claim", description: "Inform your insurance company within 24 hours. File a claim with the third-party insurer of the at-fault vehicle. Keep all medical bills and reports." },
    ],
    legalBasis: ["Motor Vehicles Act 2019 — Section 134, 159, 162", "BNS Section 106 (Death by negligence)", "Good Samaritan Guidelines (Supreme Court 2016)"],
    importantNumbers: [{ name: "Ambulance", number: "108" }, { name: "Police", number: "100" }, { name: "Emergency", number: "112" }],
  },
];

export function getPlaybookById(id: string): Playbook | undefined {
  return PLAYBOOKS.find((p) => p.id === id);
}

export function getPlaybooksByCategory(category: string): Playbook[] {
  return PLAYBOOKS.filter((p) => p.category === category);
}

export function getPlaybookCategories(): string[] {
  return [...new Set(PLAYBOOKS.map((p) => p.category))];
}
