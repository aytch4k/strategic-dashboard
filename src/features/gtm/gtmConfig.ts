import { SpreadsheetConfig } from '../../utils/spreadsheet';

export const gtmConfig: SpreadsheetConfig = {
  type: 'google',
  sourceId: import.meta.env.VITE_TIMELINE_SHEETS_ID,
  ranges: [
    // Marketing Metrics
    {
      range: 'GoToMarket!A2:D',
      targetId: 'marketing',
      mapping: {
        'B': 'reach',
        'C': 'engagement',
        'D': 'conversion'
      }
    },
    // Social Metrics
    {
      range: 'GoToMarket!E2:G',
      targetId: 'marketing.channels.social',
      mapping: {
        'E': 'followers',
        'F': 'engagement',
        'G': 'growth'
      }
    },
    // Email Metrics
    {
      range: 'GoToMarket!H2:J',
      targetId: 'marketing.channels.email',
      mapping: {
        'H': 'subscribers',
        'I': 'openRate',
        'J': 'clickRate'
      }
    },
    // Content Metrics
    {
      range: 'GoToMarket!K2:M',
      targetId: 'marketing.channels.content',
      mapping: {
        'K': 'articles',
        'L': 'views',
        'M': 'shares'
      }
    },
    // Community Metrics
    {
      range: 'GoToMarket!N2:P',
      targetId: 'community',
      mapping: {
        'N': 'members',
        'O': 'growth',
        'P': 'retention'
      }
    },
    // Partnership Metrics
    {
      range: 'GoToMarket!Q2:S',
      targetId: 'partnerships',
      mapping: {
        'Q': 'active',
        'R': 'pipeline',
        'S': 'completed'
      }
    },
    // Product Metrics
    {
      range: 'GoToMarket!T2:V',
      targetId: 'product.adoption',
      mapping: {
        'T': 'users',
        'U': 'growth',
        'V': 'churn'
      }
    },
    // Sales Metrics
    {
      range: 'GoToMarket!W2:Y',
      targetId: 'sales.pipeline',
      mapping: {
        'W': 'value',
        'X': 'deals',
        'Y': 'conversion'
      }
    }
  ]
};