import React, { useState } from 'react';
import { TopBar, Scroll, Card, Input, Pill, Button } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, Project, Advance } from '../../../types';
import { calculateProgress, calculateValue, formatCurrencyShort } from '../../../utils/helpers';
import { COLOR_PALETTE, BRAND_COLORS } from '../../../constants/colors';

interface ProjectsScreenProps {
  user: User;
  projects: Project[];
  advances: Advance[];
  onProject: (project: Project) => void;
  onNav: (screen: string) => void;
  onNew?: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ user, projects, advances, onProject, onNav, onNew }) => {
  const [query, setQuery] = useState('');
  const mine = user.role === 'admin' ? projects : projects.filter(project => user.ap.includes(project.id));
  const filtered = mine.filter(project => project.name.toLowerCase().includes(query.toLowerCase()) || project.code.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Proyectos" subtitle={`${mine.length} proyecto${mine.length !== 1 ? 's' : ''}`} user={user} right={onNew ? <Button label="Nuevo" onClick={onNew} /> : undefined} />
      <div style={{ padding: 14, background: COLOR_PALETTE.white }}>
        <Input label="Buscar" value={query} onChange={setQuery} placeholder="Buscar obra..." />
      </div>
      <Scroll style={{ padding: 16 }}>
        {filtered.map(project => (
          <Card key={project.id} style={{ marginBottom: 10 }} onClick={() => onProject(project)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{project.name}</div>
                <div style={{ fontSize: 11, color: COLOR_PALETTE.gray5 }}>{project.code}</div>
              </div>
              <Pill label={`${calculateProgress(project.partidas)}%`} color={BRAND_COLORS.primary} bg={COLOR_PALETTE.primaryLight} size={10} />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: COLOR_PALETTE.gray7 }}>Valor: {formatCurrencyShort(calculateValue(project.partidas))}</div>
          </Card>
        ))}
      </Scroll>
      <NavBar active="projects" onNavigate={onNav} role={user.role} />
    </div>
  );
};
