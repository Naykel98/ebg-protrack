import React from 'react';
import { TopBar, Scroll, Card } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, WorkEntry, Project } from '../../../types';
import { COLOR_PALETTE } from '../../../constants/colors';

interface CamScreenProps {
  user: User;
  projects: Project[];
  entries: WorkEntry[];
  onNav: (screen: string) => void;
  onBack: () => void;
}

export const CamScreen: React.FC<CamScreenProps> = ({ user, projects, entries, onNav, onBack }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <TopBar title="Registro" subtitle="Notas de obra" user={user} onBack={onBack} />
    <Scroll style={{ padding: 16 }}>
      {entries.length === 0 ? (
        <Card>No hay registros.</Card>
      ) : entries.map(entry => (
        <Card key={entry.id} style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>{entry.nota}</div>
          <div style={{ fontSize: 11, color: COLOR_PALETTE.gray5 }}>{entry.fecha}</div>
        </Card>
      ))}
    </Scroll>
    <NavBar active="cam" onNavigate={onNav} role={user.role} />
  </div>
);
