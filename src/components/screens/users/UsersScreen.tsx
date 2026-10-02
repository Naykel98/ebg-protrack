import React from 'react';
import { TopBar, Scroll, Card, Pill } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User, Project } from '../../../types';
import { COLOR_PALETTE } from '../../../constants/colors';
import { getRoleLabel } from '../../../utils/helpers';

interface UsersScreenProps {
  user: User;
  users: User[];
  projects: Project[];
  onNav: (screen: string) => void;
}

export const UsersScreen: React.FC<UsersScreenProps> = ({ user, users, projects, onNav }) => {
  const visibleUsers = user.role === 'admin' ? users : [user];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Usuarios" subtitle={`${visibleUsers.length} registrado${visibleUsers.length !== 1 ? 's' : ''}`} user={user} />
      <Scroll style={{ padding: 16 }}>
        {visibleUsers.map(item => (
          <Card key={item.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: COLOR_PALETTE.gray5 }}>{item.email}</div>
              </div>
              <Pill label={getRoleLabel(item.role)} color={COLOR_PALETTE.primary} bg={COLOR_PALETTE.primaryLight} size={10} />
            </div>
          </Card>
        ))}
      </Scroll>
      <NavBar active="users" onNavigate={onNav} role={user.role} />
    </div>
  );
};
