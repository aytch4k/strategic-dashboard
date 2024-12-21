import React from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { VisionCard } from './features/vision/VisionCard';
import { StrategiesList } from './features/strategy/StrategiesList';
import { KPIGrid } from './features/kpi/KPIGrid';
import { MilestoneTimeline } from './features/blockchain/MilestoneTimeline';
import { NodeSaleCard } from './features/blockchain/NodeSaleCard';
import { SecurityScanCard } from './features/blockchain/SecurityScanCard';
import { GTMCard } from './features/gtm/GTMCard';
import { EcosystemCard } from './features/ecosystem/EcosystemCard';
import { useSpreadsheetFallback } from './hooks/useSpreadsheetFallback';
import { GridCard } from './components/GridCard';
import { useDashboardStore } from './store/dashboardStore';
import { useGridStore } from './store/gridStore';
import { mockKPIs, mockNodeSale, mockSecurity } from './data/mockData';

export default function App() {
  const { setKPIs } = useDashboardStore();
  const { hiddenCards } = useGridStore();

  React.useEffect(() => {
    setKPIs(mockKPIs);
  }, [setKPIs]);

  useSpreadsheetFallback();

  return (
    <DashboardLayout>
      {!hiddenCards.includes('vision') && (
        <GridCard id="vision">
          <VisionCard />
        </GridCard>
      )}
      
      {!hiddenCards.includes('strategies') && (
        <GridCard id="strategies">
          <StrategiesList />
        </GridCard>
      )}
      
      {!hiddenCards.includes('milestone') && (
        <GridCard id="milestone">
          <MilestoneTimeline />
        </GridCard>
      )}

      {!hiddenCards.includes('gtm') && (
        <GridCard id="gtm">
          <GTMCard />
        </GridCard>
      )}

      {!hiddenCards.includes('ecosystem') && (
        <GridCard id="ecosystem">
          <EcosystemCard />
        </GridCard>
      )}
      
      {!hiddenCards.includes('nodeSale') && (
        <GridCard id="nodeSale">
          <NodeSaleCard metrics={mockNodeSale} />
        </GridCard>
      )}
      
      {!hiddenCards.includes('security') && (
        <GridCard id="security">
          <SecurityScanCard metrics={mockSecurity} />
        </GridCard>
      )}
      
      {!hiddenCards.includes('kpi') && (
        <GridCard id="kpi">
          <KPIGrid kpis={mockKPIs} />
        </GridCard>
      )}
    </DashboardLayout>
  );
}