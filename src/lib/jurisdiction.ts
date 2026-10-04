export interface JurisdictionInfo {
  state: string;
  stateCode: string;
  rentControlAct: string;
  consumerForum: string;
  labourCommissioner: string;
  legalAid: string;
}

export const INDIAN_STATES: JurisdictionInfo[] = [
  { state: "Andhra Pradesh", stateCode: "AP", rentControlAct: "AP Buildings (Lease, Rent and Eviction) Control Act, 1960", consumerForum: "AP State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, AP", legalAid: "AP State Legal Services Authority" },
  { state: "Assam", stateCode: "AS", rentControlAct: "Assam Urban Areas Rent Control Act, 1972", consumerForum: "Assam State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Assam", legalAid: "Assam State Legal Services Authority" },
  { state: "Bihar", stateCode: "BR", rentControlAct: "Bihar Buildings (Lease, Rent and Eviction) Control Act, 1982", consumerForum: "Bihar State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Bihar", legalAid: "Bihar State Legal Services Authority" },
  { state: "Delhi", stateCode: "DL", rentControlAct: "Delhi Rent Control Act, 1958", consumerForum: "Delhi State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Delhi", legalAid: "Delhi State Legal Services Authority" },
  { state: "Goa", stateCode: "GA", rentControlAct: "Goa, Daman and Diu Buildings (Lease, Rent and Eviction) Control Act, 1968", consumerForum: "Goa State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Goa", legalAid: "Goa State Legal Services Authority" },
  { state: "Gujarat", stateCode: "GJ", rentControlAct: "Bombay Rents, Hotel and Lodging House Rates Control Act, 1947 (as applicable)", consumerForum: "Gujarat State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Gujarat", legalAid: "Gujarat State Legal Services Authority" },
  { state: "Haryana", stateCode: "HR", rentControlAct: "Haryana Urban (Control of Rent and Eviction) Act, 1973", consumerForum: "Haryana State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Haryana", legalAid: "Haryana State Legal Services Authority" },
  { state: "Himachal Pradesh", stateCode: "HP", rentControlAct: "HP Urban Rent Control Act, 1987", consumerForum: "HP State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, HP", legalAid: "HP State Legal Services Authority" },
  { state: "Jharkhand", stateCode: "JH", rentControlAct: "Bihar Buildings (Lease, Rent and Eviction) Control Act, 1982 (as applicable)", consumerForum: "Jharkhand State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Jharkhand", legalAid: "Jharkhand State Legal Services Authority" },
  { state: "Karnataka", stateCode: "KA", rentControlAct: "Karnataka Rent Act, 1999", consumerForum: "Karnataka State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Karnataka", legalAid: "Karnataka State Legal Services Authority" },
  { state: "Kerala", stateCode: "KL", rentControlAct: "Kerala Buildings (Lease and Rent Control) Act, 1965", consumerForum: "Kerala State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Kerala", legalAid: "Kerala State Legal Services Authority" },
  { state: "Madhya Pradesh", stateCode: "MP", rentControlAct: "MP Accommodation Control Act, 1961", consumerForum: "MP State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, MP", legalAid: "MP State Legal Services Authority" },
  { state: "Maharashtra", stateCode: "MH", rentControlAct: "Maharashtra Rent Control Act, 1999", consumerForum: "Maharashtra State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Maharashtra", legalAid: "Maharashtra State Legal Services Authority" },
  { state: "Odisha", stateCode: "OD", rentControlAct: "Odisha House Rent Control Act, 1967", consumerForum: "Odisha State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Odisha", legalAid: "Odisha State Legal Services Authority" },
  { state: "Punjab", stateCode: "PB", rentControlAct: "East Punjab Urban Rent Restriction Act, 1949", consumerForum: "Punjab State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Punjab", legalAid: "Punjab State Legal Services Authority" },
  { state: "Rajasthan", stateCode: "RJ", rentControlAct: "Rajasthan Rent Control Act, 2001", consumerForum: "Rajasthan State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Rajasthan", legalAid: "Rajasthan State Legal Services Authority" },
  { state: "Tamil Nadu", stateCode: "TN", rentControlAct: "Tamil Nadu Buildings (Lease and Rent Control) Act, 1960", consumerForum: "Tamil Nadu State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Tamil Nadu", legalAid: "Tamil Nadu State Legal Services Authority" },
  { state: "Telangana", stateCode: "TS", rentControlAct: "AP Buildings (Lease, Rent and Eviction) Control Act, 1960 (as applicable)", consumerForum: "Telangana State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, Telangana", legalAid: "Telangana State Legal Services Authority" },
  { state: "Uttar Pradesh", stateCode: "UP", rentControlAct: "UP Urban Buildings (Regulation of Letting, Rent and Eviction) Act, 1972", consumerForum: "UP State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, UP", legalAid: "UP State Legal Services Authority" },
  { state: "West Bengal", stateCode: "WB", rentControlAct: "West Bengal Premises Tenancy Act, 1997", consumerForum: "WB State Consumer Disputes Redressal Commission", labourCommissioner: "Commissioner of Labour, WB", legalAid: "WB State Legal Services Authority" },
];

export function findJurisdiction(stateInput: string): JurisdictionInfo | null {
  const normalized = stateInput.toLowerCase().trim();
  return (
    INDIAN_STATES.find(
      (s) =>
        s.state.toLowerCase() === normalized ||
        s.stateCode.toLowerCase() === normalized
    ) ?? null
  );
}

export function getStateNames(): string[] {
  return INDIAN_STATES.map((s) => s.state).sort();
}
