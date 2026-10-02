import React, { useState } from 'react';
import { TopBar, Scroll, Card, Input, Select, Button } from '../../base/BaseComponents';
import { User, Project } from '../../../types';
import { DISCIPLINES, COLOR_PALETTE } from '../../../constants/colors';

interface NewProjectScreenProps {
  user: User;
  onSave: (project: Project) => void;
  onBack: () => void;
}

export const NewProjectScreen: React.FC<NewProjectScreenProps> = ({ user, onSave, onBack }) => {
  const [form, setForm] = useState({ name: '', code: '', location: '', client: '', startDate: '', endDate: '', discipline: DISCIPLINES[0], driveUrl: '' });
  const updateField = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.name || !form.code) return;
    onSave({ id: `p${Date.now()}`, name: form.name, code: form.code, location: form.location, client: form.client, startDate: form.startDate, endDate: form.endDate, discipline: form.discipline, driveUrl: form.driveUrl, partidas: [] });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Nuevo proyecto" user={user} onBack={onBack} />
      <Scroll style={{ padding: 16 }}>
        <Card style={{ marginBottom: 12 }}>
          <Input label="Nombre" value={form.name} onChange={value => updateField('name', value)} />
          <Input label="Código" value={form.code} onChange={value => updateField('code', value)} />
          <Input label="Ubicación" value={form.location} onChange={value => updateField('location', value)} />
          <Input label="Cliente" value={form.client} onChange={value => updateField('client', value)} />
          <Select label="Disciplina" value={form.discipline} onChange={value => updateField('discipline', value)} options={DISCIPLINES.map(item => [item, item])} />
          <div style={{ display: 'flex', gap: 10 }}>
            <Input label="Inicio" value={form.startDate} onChange={value => updateField('startDate', value)} type="date" />
            <Input label="Fin" value={form.endDate} onChange={value => updateField('endDate', value)} type="date" />
          </div>
          <Input label="Drive URL" value={form.driveUrl} onChange={value => updateField('driveUrl', value)} />
          <Button label="Guardar" onClick={handleSave} full />
        </Card>
      </Scroll>
    </div>
  );
};
