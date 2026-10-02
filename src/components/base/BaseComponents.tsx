import React from 'react';
import { User } from '../../types';
import { COLOR_PALETTE } from '../../constants/colors';

const frame: React.CSSProperties = { width: '100%', minHeight: '100vh', background: COLOR_PALETTE.gray0, display: 'flex', justifyContent: 'center', padding: 0, margin: 0 };
const phone: React.CSSProperties = { width: 360, minHeight: 640, background: COLOR_PALETTE.white, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', overflow: 'hidden', display: 'flex', flexDirection: 'column' };

export const Phone: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={frame}>
    <div style={phone}>{children}</div>
  </div>
);

interface TopBarProps {
  title: string;
  subtitle?: string;
  user?: User;
  onBack?: () => void;
  right?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, user, onBack, right }) => (
  <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid ' + COLOR_PALETTE.gray2, background: COLOR_PALETTE.white, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {onBack ? <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>←</button> : null}
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: COLOR_PALETTE.gray9 }}>{title}</div>
        {subtitle ? <div style={{ fontSize: 12, color: COLOR_PALETTE.gray5 }}>{subtitle}</div> : null}
      </div>
    </div>
    {right || null}
  </div>
);

export const Scroll: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ style, children }) => (
  <div style={{ flex: 1, overflowY: 'auto', ...style }}>{children}</div>
);

export const Card: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties; onClick?: () => void }>> = ({ style, onClick, children }) => (
  <div onClick={onClick} style={{ background: COLOR_PALETTE.white, borderRadius: 16, padding: 14, boxShadow: '0 6px 16px rgba(15,23,42,0.04)', cursor: onClick ? 'pointer' : 'default', ...style }}>
    {children}
  </div>
);

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  full?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, color = COLOR_PALETTE.primary, full = false }) => (
  <button onClick={onClick} style={{ width: full ? '100%' : 'auto', background: color, color: 'white', border: 'none', borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 700 }}>
    {label}
  </button>
);

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div style={{ marginBottom: 12 }}>
    {label ? <div style={{ marginBottom: 6, fontSize: 12, color: COLOR_PALETTE.gray7 }}>{label}</div> : null}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', borderRadius: 12, border: '1px solid ' + COLOR_PALETTE.gray2, padding: '10px 12px', fontSize: 14 }} />
  </div>
);

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 12 }}>
    {label ? <div style={{ marginBottom: 6, fontSize: 12, color: COLOR_PALETTE.gray7 }}>{label}</div> : null}
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', borderRadius: 12, border: '1px solid ' + COLOR_PALETTE.gray2, padding: '10px 12px', fontSize: 14, background: COLOR_PALETTE.white }}>
      {options.map(([valueKey, labelKey]) => <option key={valueKey} value={valueKey}>{labelKey}</option>)}
    </select>
  </div>
);

interface PillProps {
  label: string;
  color: string;
  bg: string;
  size?: number;
}

export const Pill: React.FC<PillProps> = ({ label, color, bg, size = 8 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 999, fontSize: size, color, background: bg, fontWeight: 700 }}>{label}</span>
);

interface ProgressBarProps {
  value: number;
  color: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color, height = 8 }) => (
  <div style={{ width: '100%', background: '#f0f4f8', borderRadius: height / 2, height }}>
    <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color, height, borderRadius: height / 2 }} />
  </div>
);
