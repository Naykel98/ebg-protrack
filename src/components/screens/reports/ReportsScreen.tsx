import React, { useState } from 'react';
import { TopBar, Scroll, Card } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, Project } from '../../../types';
import { COLOR_PALETTE } from '../../../constants/colors';

interface ReportsScreenProps {
  user: User;
  projects: Project[];
  onNav: (screen: string) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ user, projects, onNav }) => {
  const [selected] = useState(projects[0]?.id || '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Reportes" subtitle="Análisis rápido" user={user} />
      <Scroll style={{ padding: 16 }}>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>Proyecto seleccionado</div>
          <div style={{ marginTop: 8 }}>{selected ? projects.find(project => project.id === selected)?.name : 'Ninguno'}</div>
        </Card>
      </Scroll>
      <NavBar active="chart" onNavigate={onNav} role={user.role} />
    </div>
  );
};
