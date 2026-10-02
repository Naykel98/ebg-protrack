import React from 'react';
import { TopBar, Scroll, Card, Button } from '../../base/BaseComponents';
import { NavBar } from '../../base/NavBar';
import { User } from '../../../types';
import { COLOR_PALETTE } from '../../../constants/colors';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onNav: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onNav }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <TopBar title="Mi perfil" subtitle={user.email} user={user} />
    <Scroll style={{ padding: 16 }}>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>{user.name}</div>
        <div style={{ marginTop: 6 }}>{user.company}</div>
      </Card>
      <Button label="Cerrar sesión" onClick={onLogout} full />
    </Scroll>
    <NavBar active="me" onNavigate={onNav} role={user.role} />
  </div>
);
