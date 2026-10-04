export interface LegalSection {
  summary: string;
  offense?: string;
  punishment?: string;
  bailable?: boolean;
}

export const LEGAL_SECTIONS: Record<string, LegalSection> = {
  // ─── BHARATIYA NYAYA SANHITA (BNS) 2023 — replaced IPC from 1 July 2024 ───
  "BNS:100": { summary: "Culpable homicide", offense: "Causing death by act done with intention or knowledge", punishment: "Up to life imprisonment or 10 years + fine" },
  "BNS:101": { summary: "Murder", offense: "Intentional causing of death", punishment: "Death or life imprisonment + fine", bailable: false },
  "BNS:103": { summary: "Punishment for murder", offense: "Murder", punishment: "Death or life imprisonment + fine", bailable: false },
  "BNS:105": { summary: "Culpable homicide not amounting to murder", punishment: "Up to life imprisonment, or up to 10 years + fine" },
  "BNS:109": { summary: "Attempt to murder", punishment: "Up to life imprisonment + fine", bailable: false },
  "BNS:115": { summary: "Voluntarily causing hurt", punishment: "Up to 1 year or fine up to Rs 10,000 or both", bailable: true },
  "BNS:117": { summary: "Voluntarily causing grievous hurt", punishment: "Up to 7 years + fine", bailable: false },
  "BNS:118": { summary: "Voluntarily causing hurt by dangerous weapons", punishment: "Up to 3 years or fine or both", bailable: true },
  "BNS:121": { summary: "Voluntarily causing grievous hurt by dangerous weapons", punishment: "Up to life imprisonment or up to 10 years + fine" },
  "BNS:123": { summary: "Acid attack", punishment: "Minimum 10 years up to life imprisonment + fine", bailable: false },
  "BNS:127": { summary: "Wrongful restraint and confinement", punishment: "Up to 1 month or fine up to Rs 5,000 or both", bailable: true },
  "BNS:130": { summary: "Criminal force", punishment: "Up to 3 months or fine up to Rs 1,000 or both", bailable: true },
  "BNS:140": { summary: "Kidnapping", offense: "Kidnapping from lawful guardianship", punishment: "Up to 7 years + fine", bailable: false },
  "BNS:143": { summary: "Kidnapping for ransom", punishment: "Up to death or life imprisonment + fine", bailable: false },
  "BNS:63": { summary: "Sexual harassment", offense: "Physical contact, demand for sexual favours, showing pornography, making sexual remarks", punishment: "Up to 3 years or fine or both", bailable: true },
  "BNS:64": { summary: "Assault on woman with intent to disrobe", punishment: "3-7 years + fine", bailable: false },
  "BNS:65": { summary: "Voyeurism", punishment: "1-3 years first offence, 3-7 years repeat", bailable: false },
  "BNS:66": { summary: "Stalking", punishment: "Up to 3 years first offence, up to 5 years repeat + fine", bailable: true },
  "BNS:69": { summary: "Rape", punishment: "Minimum 10 years up to life imprisonment + fine", bailable: false },
  "BNS:70": { summary: "Gang rape", punishment: "Minimum 20 years up to life imprisonment + fine", bailable: false },
  "BNS:74": { summary: "Assault on woman with intent to outrage modesty", punishment: "1-5 years + fine", bailable: false },
  "BNS:75": { summary: "Sexual harassment (workplace/public)", punishment: "Up to 3 years or fine or both" },
  "BNS:76": { summary: "Dowry death", offense: "Death of woman within 7 years of marriage under suspicious circumstances", punishment: "Minimum 7 years up to life imprisonment", bailable: false },
  "BNS:77": { summary: "Cruelty by husband or relatives", offense: "Subjecting woman to cruelty by husband or relatives", punishment: "Up to 3 years + fine", bailable: false },
  "BNS:78": { summary: "Husband or relative subjecting woman to cruelty for dowry", punishment: "Up to 3 years + fine", bailable: false },
  "BNS:79": { summary: "Word, gesture or act intended to insult modesty of woman", punishment: "Up to 3 years + fine" },
  "BNS:85": { summary: "Cruelty by husband or relatives (domestic violence context)", punishment: "Up to 3 years + fine", bailable: false },
  "BNS:173": { summary: "False information with intent to cause public servant to use lawful power to injury", punishment: "Up to 2 years or fine or both" },
  "BNS:196": { summary: "Promoting enmity between groups", punishment: "Up to 3 years or fine or both" },
  "BNS:263": { summary: "Criminal breach of trust", punishment: "Up to 7 years + fine" },
  "BNS:303": { summary: "Theft", offense: "Dishonestly taking movable property", punishment: "Up to 3 years or fine or both", bailable: true },
  "BNS:308": { summary: "Extortion", punishment: "Up to 3 years or fine or both" },
  "BNS:309": { summary: "Robbery", punishment: "Up to 10 years + fine", bailable: false },
  "BNS:316": { summary: "Criminal breach of trust", punishment: "Up to 7 years or fine or both" },
  "BNS:318": { summary: "Cheating", offense: "Dishonestly inducing delivery of property", punishment: "Up to 3 years or fine or both", bailable: true },
  "BNS:319": { summary: "Cheating by personation", punishment: "Up to 5 years or fine or both" },
  "BNS:329": { summary: "Criminal trespass", punishment: "Up to 3 months or fine up to Rs 5,000 or both", bailable: true },
  "BNS:330": { summary: "House-trespass", punishment: "Up to 1 year or fine up to Rs 5,000 or both", bailable: true },
  "BNS:351": { summary: "Criminal intimidation", punishment: "Up to 2 years or fine or both", bailable: true },
  "BNS:356": { summary: "Defamation", punishment: "Up to 2 years or fine or both", bailable: true },

  // ─── RIGHT TO INFORMATION ACT 2005 ───
  "RTI:3": { summary: "Right to information — all citizens have the right to information subject to provisions of this Act" },
  "RTI:6": { summary: "Request for obtaining information — any person may make a request to the PIO", bailable: true },
  "RTI:7": { summary: "Disposal of request — information must be provided within 30 days, or 48 hours if life/liberty concerned" },
  "RTI:8": { summary: "Exemptions from disclosure — security, sovereignty, commercial confidence, privacy, etc." },
  "RTI:19": { summary: "Appeal — first appeal within 30 days to senior officer; second appeal within 90 days to Information Commission" },
  "RTI:20": { summary: "Penalties — Rs 250/day up to Rs 25,000 for PIO non-compliance" },

  // ─── CONSUMER PROTECTION ACT 2019 ───
  "CPA:2": { summary: "Definitions including consumer, defect, deficiency, unfair trade practice" },
  "CPA:9": { summary: "Establishment of Consumer Disputes Redressal Commissions" },
  "CPA:34": { summary: "Jurisdiction of District Commission — up to Rs 1 crore" },
  "CPA:35": { summary: "Complaint to District Commission — who may file and how" },
  "CPA:38": { summary: "Jurisdiction of State Commission — Rs 1 crore to Rs 10 crore" },
  "CPA:47": { summary: "Appeal against order of State Commission to National Commission" },
  "CPA:58": { summary: "Product liability — manufacturer/seller/service provider liable for harm" },
  "CPA:69": { summary: "Central Consumer Protection Authority powers" },

  // ─── MODEL TENANCY ACT 2021 ───
  "MTA:4": { summary: "Written agreement mandatory for all tenancies" },
  "MTA:7": { summary: "Security deposit — max 2 months rent for residential, max 6 months for commercial" },
  "MTA:8": { summary: "Return of security deposit — within 1 month of vacancy after deductions" },
  "MTA:10": { summary: "Tenant obligations — timely rent, maintain condition, no structural changes without permission" },
  "MTA:21": { summary: "Eviction grounds — non-payment, misuse, damage, subletting without permission" },
  "MTA:22": { summary: "Eviction procedure — landlord must give notice, cannot disconnect essential services" },
  "MTA:23": { summary: "Prohibition on cutting essential services (water, electricity) to force eviction" },

  // ─── INFORMATION TECHNOLOGY ACT 2000 ───
  "ITA:43": { summary: "Penalty for unauthorized access to computer system — compensation up to Rs 1 crore" },
  "ITA:66": { summary: "Computer related offences — hacking", punishment: "Up to 3 years or fine up to Rs 5 lakh or both" },
  "ITA:66A": { summary: "STRUCK DOWN by Supreme Court (Shreya Singhal v UOI, 2015) — was about offensive online messages" },
  "ITA:66C": { summary: "Identity theft", punishment: "Up to 3 years + fine up to Rs 1 lakh" },
  "ITA:66D": { summary: "Cheating by personation using computer resource", punishment: "Up to 3 years + fine up to Rs 1 lakh" },
  "ITA:66E": { summary: "Violation of privacy — publishing private images", punishment: "Up to 3 years or fine up to Rs 2 lakh or both" },
  "ITA:67": { summary: "Publishing obscene material electronically", punishment: "Up to 5 years + fine up to Rs 10 lakh" },
  "ITA:67A": { summary: "Publishing sexually explicit material electronically", punishment: "Up to 7 years + fine up to Rs 10 lakh" },
  "ITA:67B": { summary: "Publishing child sexual abuse material", punishment: "Up to 7 years + fine up to Rs 10 lakh" },
  "ITA:69": { summary: "Power of government to issue directions for interception/decryption" },
  "ITA:72": { summary: "Breach of confidentiality and privacy", punishment: "Up to 2 years or fine up to Rs 1 lakh or both" },

  // ─── NEGOTIABLE INSTRUMENTS ACT 1881 ───
  "NIA:138": { summary: "Dishonour of cheque for insufficiency of funds", offense: "Cheque bouncing", punishment: "Up to 2 years or fine up to twice the cheque amount or both", bailable: true },
  "NIA:141": { summary: "Offences by companies — every person in charge of company is deemed guilty" },
  "NIA:142": { summary: "Cognizance of offences — complaint must be made within 30 days of receiving notice from bank" },

  // ─── IPC SECTIONS (for backwards compatibility with old references) ───
  "IPC:302": { summary: "REPEALED — replaced by BNS Section 103 (Murder)", punishment: "Death or life imprisonment + fine" },
  "IPC:304": { summary: "REPEALED — replaced by BNS Section 105 (Culpable homicide not amounting to murder)" },
  "IPC:354": { summary: "REPEALED — replaced by BNS Section 74 (Assault on woman with intent to outrage modesty)" },
  "IPC:376": { summary: "REPEALED — replaced by BNS Section 69 (Rape)" },
  "IPC:420": { summary: "REPEALED — replaced by BNS Section 318 (Cheating)", punishment: "Up to 7 years + fine" },
  "IPC:498A": { summary: "REPEALED — replaced by BNS Section 85 (Cruelty by husband or relatives)" },
  "IPC:506": { summary: "REPEALED — replaced by BNS Section 351 (Criminal intimidation)" },
  "IPC:509": { summary: "REPEALED — replaced by BNS Section 79 (Word, gesture or act to insult modesty of woman)" },
};
