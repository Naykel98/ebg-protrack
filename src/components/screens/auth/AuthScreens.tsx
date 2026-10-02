import React, { useState } from 'react';
import { User } from '../../../types';
import { Phone, Card, Button, Input } from '../../base/BaseComponents';
import { COLOR_PALETTE } from '../../../constants/colors';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  users: User[];
}

export const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => (
  <Phone>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: COLOR_PALETTE.primary }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1>EBG Supervisión</h1>
        <p>Control simple de proyectos y obra.</p>
        <button onClick={onDone} style={{ marginTop: 20, padding: '10px 18px', borderRadius: 10, border: 'none', background: 'white', color: COLOR_PALETTE.primary, fontWeight: 700, cursor: 'pointer' }}>Ingresar</button>
      </div>
    </div>
  </Phone>
);

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const user = users.find(u => u.email === email && u.pass === password);
    if (!user) {
      setError('Credenciales inválidas');
      return;
    }
    onLogin(user);
  };

  return (
    <Phone>
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card style={{ maxWidth: 340, margin: '0 auto' }}>
          <h2 style={{ marginBottom: 12 }}>Bienvenido</h2>
          <Input label="Correo" value={email} onChange={setEmail} placeholder="usuario@ebg.com" />
          <Input label="Contraseña" value={password} onChange={setPassword} type="password" />
          {error ? <div style={{ color: 'red', marginBottom: 10 }}>{error}</div> : null}
          <Button label="Ingresar" onClick={submit} full />
        </Card>
      </div>
    </Phone>
  );
};
