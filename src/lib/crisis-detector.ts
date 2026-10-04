export interface CrisisResult {
  isCrisis: boolean;
  type: CrisisType | null;
  helplines: Helpline[];
  safetyWarning: string | null;
}

export type CrisisType =
  | "domestic_violence"
  | "sexual_harassment"
  | "self_harm"
  | "child_abuse"
  | "cyber_crime"
  | "immediate_danger";

export interface Helpline {
  name: string;
  number: string;
  description: string;
  available: string;
}

const CRISIS_PATTERNS: Record<CrisisType, RegExp[]> = {
  domestic_violence: [
    /\b(husband|wife|partner|spouse)\b.*\b(beat|hit|slap|punch|kick|abuse|attack|threaten|chok)/i,
    /\b(domestic\s*violence|dv|marital\s*abuse|dowry\s*harass)/i,
    /\b(beating\s*me|hits\s*me|threatens?\s*to\s*kill|locked\s*me)/i,
    /\b(dowry|dahej)\b.*\b(demand|harass|torture|threat)/i,
  ],
  sexual_harassment: [
    /\b(sexual\s*harass|molest|rape|sexual\s*assault|grop|touch\s*inappropriately)/i,
    /\b(boss|colleague|coworker)\b.*\b(touch|harass|force|pressure)/i,
    /\b(stalk|following\s*me|won't\s*leave\s*me\s*alone)/i,
  ],
  self_harm: [
    /\b(kill\s*myself|suicide|end\s*(my|this)\s*life|don't\s*want\s*to\s*live)/i,
    /\b(self.?harm|hurt\s*myself|cutting\s*myself)/i,
    /\b(can't\s*take\s*(it|this)\s*anymore|no\s*point\s*(in\s*)?living)/i,
  ],
  child_abuse: [
    /\b(child|minor|kid|daughter|son)\b.*\b(abuse|molest|beat|exploit|traffic)/i,
    /\b(pocso|child\s*porn|child\s*labour|child\s*marriage)/i,
  ],
  cyber_crime: [
    /\b(blackmail|sextort|morphed\s*photos?|intimate\s*images?|revenge\s*porn)/i,
    /\b(online\s*harass|cyber\s*(stalk|bully|threat))/i,
    /\b(hacked?\s*my|phishing|fraud.*online|upi.*fraud)/i,
  ],
  immediate_danger: [
    /\b(going\s*to\s*kill|death\s*threat|weapon|gun|knife)\b/i,
    /\b(kidnap|abduct|hostage|held\s*against)/i,
    /\b(someone\s*(is\s*)?breaking\s*in|intruder|trespass.*right\s*now)/i,
  ],
};

const HELPLINES: Record<CrisisType, Helpline[]> = {
  domestic_violence: [
    { name: "Women Helpline", number: "181", description: "24/7 helpline for women in distress", available: "24/7" },
    { name: "NCW Helpline", number: "7827-170-170", description: "National Commission for Women", available: "24/7" },
    { name: "Police", number: "100", description: "Emergency police response", available: "24/7" },
    { name: "One Stop Centre", number: "181", description: "Shelter, legal aid, medical help for women", available: "24/7" },
  ],
  sexual_harassment: [
    { name: "Women Helpline", number: "181", description: "24/7 helpline for women in distress", available: "24/7" },
    { name: "Police", number: "100", description: "Emergency police response", available: "24/7" },
    { name: "NCW Helpline", number: "7827-170-170", description: "National Commission for Women", available: "24/7" },
  ],
  self_harm: [
    { name: "iCall", number: "9152987821", description: "Professional counseling service (TISS)", available: "Mon-Sat 8am-10pm" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", description: "Mental health crisis support", available: "24/7" },
    { name: "AASRA", number: "9820466726", description: "Suicide prevention helpline", available: "24/7" },
  ],
  child_abuse: [
    { name: "Childline", number: "1098", description: "Emergency help for children in distress", available: "24/7" },
    { name: "NCPCR", number: "011-23478200", description: "National Commission for Protection of Child Rights", available: "Office hours" },
    { name: "Police", number: "100", description: "Emergency police response", available: "24/7" },
  ],
  cyber_crime: [
    { name: "Cyber Crime Helpline", number: "1930", description: "National Cyber Crime Reporting", available: "24/7" },
    { name: "Cyber Crime Portal", number: "cybercrime.gov.in", description: "Online complaint portal", available: "24/7" },
    { name: "Police", number: "100", description: "Emergency police response", available: "24/7" },
  ],
  immediate_danger: [
    { name: "Police", number: "100", description: "Emergency police response", available: "24/7" },
    { name: "Emergency", number: "112", description: "Unified emergency number", available: "24/7" },
    { name: "Ambulance", number: "108", description: "Emergency medical services", available: "24/7" },
  ],
};

const SAFETY_WARNINGS: Record<CrisisType, string> = {
  domestic_violence:
    "Your safety comes first. If you are in immediate danger, call 100 (police) or 112 (emergency) right now. The legal steps below are important, but please ensure you are safe before proceeding.",
  sexual_harassment:
    "This is a serious matter. You have every right to report this. If you are in immediate danger, call 100 now. Everything you share here stays on your device.",
  self_harm:
    "I hear you, and I'm concerned about your wellbeing. Please reach out to a trained counselor — they can help. You don't have to go through this alone.",
  child_abuse:
    "Child safety is the top priority. If a child is in immediate danger, call 1098 (Childline) or 100 (Police) right now.",
  cyber_crime:
    "Don't delete any evidence — screenshots, messages, transaction IDs. Report to the cyber crime portal immediately. Do not engage with the attacker further.",
  immediate_danger:
    "CALL 100 (POLICE) OR 112 (EMERGENCY) IMMEDIATELY. Your physical safety is the priority. Legal steps can wait — get to safety first.",
};

export function detectCrisis(text: string): CrisisResult {
  for (const [type, patterns] of Object.entries(CRISIS_PATTERNS) as [CrisisType, RegExp[]][]) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return {
          isCrisis: true,
          type,
          helplines: HELPLINES[type],
          safetyWarning: SAFETY_WARNINGS[type],
        };
      }
    }
  }

  return { isCrisis: false, type: null, helplines: [], safetyWarning: null };
}

export function getGeneralHelplines(): Helpline[] {
  return [
    { name: "NALSA", number: "15100", description: "Free legal aid for eligible citizens", available: "Office hours" },
    { name: "Legal Aid", number: "nalsa.gov.in", description: "National Legal Services Authority", available: "Online" },
    { name: "Consumer Helpline", number: "1800-11-4000", description: "National Consumer Helpline (toll-free)", available: "Mon-Sat" },
    { name: "Labour Helpline", number: "14434", description: "Shram Suvidha Portal", available: "Office hours" },
  ];
}
