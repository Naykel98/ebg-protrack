import { Partida } from '../types';

export const calculateProgress = (partidas: Partida[]) => {
  if (!partidas.length) return 0;
  return Math.round(partidas.reduce((sum, partida) => sum + partida.avance, 0) / partidas.length);
};

export const calculateValue = (partidas: Partida[]) => partidas.reduce((sum, partida) => sum + partida.qty * partida.pu, 0);

export const calculateBudget = (partidas: Partida[]) => calculateValue(partidas);

export const formatCurrencyShort = (value: number) => `S/ ${Math.round(value).toLocaleString('es-PE')}`;

export const getRoleLabel = (role: 'admin' | 'supervisor' | 'client') => {
  if (role === 'admin') return 'Admin';
  if (role === 'supervisor') return 'Supervisor';
  return 'Cliente';
};

export const formatDate = (date: string) => date;
