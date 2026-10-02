import React from 'react';
import { TopBar, Scroll, Card, Pill } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, Project, Advance, Asset } from '../../../types';
import { COLOR_PALETTE, BRAND_COLORS } from '../../../constants/colors';
import { calculateProgress, calculateValue, formatCurrencyShort } from '../../../utils/helpers';

interface DashboardProps {
  user: User;
  projects: Project[];
  advances: Advance[];
  assets: Asset[];
  onProject: (project: Project) => void;
  onNav: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, projects, advances, assets, onProject, onNav }) => {
  const mine = user.role === 'admin' ? projects : projects.filter(project => user.ap.includes(project.id));
  const progress = mine.length ? Math.round(mine.reduce((sum, project) => sum + calculateProgress(project.partidas), 0) / mine.length) : 0;
  const totalValue = mine.reduce((sum, project) => sum + calculateValue(project.partidas), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title={`Hola, ${user.name}`} subtitle={user.company} user={user} />
      <Scroll style={{ padding: 16 }}>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Resumen</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <Pill label={`${mine.length} proyecto${mine.length !== 1 ? 's' : ''}`} color={COLOR_PALETTE.primary} bg={COLOR_PALETTE.primaryLight} size={11} />
            <Pill label={`${progress}% avance`} color={COLOR_PALETTE.success} bg={COLOR_PALETTE.successLight} size={11} />
            <Pill label={formatCurrencyShort(totalValue)} color={COLOR_PALETTE.accent} bg={COLOR_PALETTE.accentLight} size={11} />
          </div>
        </Card>
        {mine.map(project => (
          <Card key={project.id} style={{ marginBottom: 10 }} onClick={() => onProject(project)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{project.name}</div>
                <div style={{ fontSize: 11, color: COLOR_PALETTE.gray5 }}>{project.code}</div>
              </div>
              <Pill label={`${calculateProgress(project.partidas)}%`} color={BRAND_COLORS.primary} bg={COLOR_PALETTE.primaryLight} size={10} />
            </div>
          </Card>
        ))}
      </Scroll>
      <NavBar active="home" onNavigate={onNav} role={user.role} />
    </div>
  );
};
