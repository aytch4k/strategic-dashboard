import { SheetName } from './sheetIds';

export function getSheetNameForCard(cardId: string): SheetName | null {
  const mapping: Record<string, SheetName> = {
    vision: 'Vision',
    strategies: 'Strategy',
    milestone: 'Timeline',
    gtm: 'GoToMarket',
    ecosystem: 'Ecosystem',
    nodeSale: 'Timeline',  // Changed from Summary to Timeline
    security: 'Summary',
    kpi: 'Summary'
  };

  return mapping[cardId] || null;
}