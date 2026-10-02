import { User, Project, Advance, Asset, WorkEntry, Additional } from '../types';

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Ana Pérez', email: 'ana@ebg.com', pass: '1234', role: 'admin', avatar: 'AP', company: 'Engine Business Group', ap: ['p1', 'p2'] },
  { id: 'u2', name: 'Raúl Silva', email: 'raul@ebg.com', pass: '1234', role: 'supervisor', avatar: 'RS', company: 'EBG', ap: ['p2'] },
  { id: 'u3', name: 'Marta Cruz', email: 'marta@ebg.com', pass: '1234', role: 'client', avatar: 'MC', company: 'Cliente EBG', ap: ['p1'] },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'p1', name: 'Obra Central', code: 'OC-001', location: 'Lima', client: 'EBG Cliente', startDate: '2025-03-01', endDate: '2025-12-31', discipline: 'Edificación', driveUrl: '', partidas: [] },
  { id: 'p2', name: 'Ruta Norte', code: 'RN-002', location: 'Piura', client: 'Gobierno', startDate: '2025-05-10', endDate: '2026-04-30', discipline: 'Infraestructura', driveUrl: '', partidas: [] },
];

export const INITIAL_ADVANCES: Advance[] = [
  { id: 'a1', pid: 'p1', ptid: 't1', fecha: '2025-04-10', pct: 18, obs: 'Avance normal', photos: 3, reg: 'Ana Pérez', status: 'approved' },
];

export const INITIAL_ASSETS: Asset[] = [
  { id: 'as1', pid: 'p1', code: 'EQ-001', name: 'Grúa móvil', qty: 1, unit: 'unidad', ok: true, loc: 'Planta', obs: 'Operativa', fecha: '2025-04-01' },
];

export const INITIAL_WORK_ENTRIES: WorkEntry[] = [
  { id: 'w1', pid: 'p1', fecha: '2025-04-11', hora: '08:30', nota: 'Revisión de cimientos', photos: 2, reg: 'Raúl Silva', edit: null },
];

export const INITIAL_ADDITIONALS: Additional[] = [
  { id: 'ad1', pid: 'p1', code: 'AD-001', name: 'Cambio de acero', unit: 'kg', qty: 120, pu: 45, motivo: 'Ajuste de diseño', status: 'pending', fecha: '2025-04-12', total: 5400 },
];
