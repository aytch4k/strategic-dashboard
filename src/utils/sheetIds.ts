export const SHEET_IDS = {
  Summary: '0',
  Health: '1271170563',
  Risks: '1362252254',
  Assumptions: '650295902',
  Issues: '777315472',
  Dependencies: '1884775173',
  Timeline: '1490536093',
  Vision: '588892886',
  Strategy: '2095617033',
  GoToMarket: '2089639170',
  Ecosystem: '1119798867',
  URL: '36726763' // Updated with correct GID for Links/URL sheet
} as const;

export type SheetName = keyof typeof SHEET_IDS;