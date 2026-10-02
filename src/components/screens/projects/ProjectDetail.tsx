import React from 'react';
import { TopBar, Scroll, Card, ProgressBar, Pill } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, Project, Advance, Asset } from '../../../types';
import { calculateProgress, calculateValue, calculateBudget, formatCurrencyShort } from '../../../utils/helpers';
import { COLOR_PALETTE, BRAND_COLORS } from '../../../constants/colors';

interface ProjectDetailProps {
  user: User;
  project: Project;
  assets: Asset[];
  advances: Advance[];
  onBack: () => void;
  onNav: (screen: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ user, project, assets, advances, onBack }) => {
  const progress = calculateProgress(project.partidas);
  const value = calculateValue(project.partidas);
  const budget = calculateBudget(project.partidas);
  const projectAssets = assets.filter(asset => asset.pid === project.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title={project.name} subtitle={project.code} user={user} onBack={onBack} />
      <Scroll style={{ padding: 16 }}>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ marginBottom: 10, fontWeight: 700 }}>Resumen</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Card style={{ padding: 10 }}>Avance: <strong>{progress}%</strong></Card>
            <Card style={{ padding: 10 }}>Valor: <strong>{formatCurrencyShort(value)}</strong></Card>
            <Card style={{ padding: 10 }}>Presupuesto: <strong>{formatCurrencyShort(budget)}</strong></Card>
            <Card style={{ padding: 10 }}>Activos: <strong>{projectAssets.length}</strong></Card>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 700 }}>Progreso</div>
          <ProgressBar value={progress} color={BRAND_COLORS.primary} />
        </Card>
      </Scroll>
      <NavBar active="projects" onNavigate={onBack ? onBack : () => {}} role={user.role} />
    </div>
  );
};
