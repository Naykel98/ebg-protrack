import React from 'react';
import { BRAND_COLORS, COLOR_PALETTE } from '../../constants/colors';

interface NavBarProps {
  active: string;
  onNavigate: (screen: string) => void;
  role: 'admin' | 'supervisor' | 'client';
}

export const NavBar: React.FC<NavBarProps> = ({ active, onNavigate, role }) => {
  const adminItems = [
    ['home', '🏠', 'Inicio'],
    ['projects', '🏗️', 'Obras'],
    ['users', '👥', 'Usuarios'],
    ['chart', '📊', 'Reportes'],
    ['me', '👤', 'Perfil'],
  ];

  const supervisorItems = [
    ['home', '🏠', 'Inicio'],
    ['projects', '🏗️', 'Obras'],
    ['cam', '📷', 'Registro'],
    ['chart', '📊', 'Reportes'],
    ['me', '👤', 'Perfil'],
  ];

  const clientItems = [
    ['home', '🏠', 'Inicio'],
    ['projects', '🏗️', 'Obras'],
    ['chart', '📊', 'Reportes'],
    ['me', '👤', 'Perfil'],
  ];

  const items = role === 'admin' ? adminItems : role === 'supervisor' ? supervisorItems : clientItems;

  return (
    <div style={{ display: 'flex', background: COLOR_PALETTE.white, borderTop: '1px solid ' + COLOR_PALETTE.gray2, padding: '8px 0' }}>
      {items.map(([id, icon, label]) => (
        <button key={id} onClick={() => onNavigate(id)} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontSize: 11, color: active === id ? BRAND_COLORS.primary : COLOR_PALETTE.gray5, fontWeight: active === id ? 700 : 500 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};
