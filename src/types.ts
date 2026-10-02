export interface User {
  id: string;
  name: string;
  email: string;
  pass: string;
  role: 'admin' | 'supervisor' | 'client';
  avatar: string;
  company: string;
  ap: string[];
}

export interface Partida {
  id: string;
  code: string;
  name: string;
  unit: string;
  qty: number;
  pu: number;
  avance: number;
  startDate: string;
  endDate: string;
  children?: Partida[];
}

export interface Project {
  id: string;
  name: string;
  code: string;
  location: string;
  client: string;
  startDate: string;
  endDate: string;
  discipline: string;
  driveUrl: string;
  partidas: Partida[];
}

export interface Advance {
  id: string;
  pid: string;
  ptid: string;
  fecha: string;
  pct: number;
  obs: string;
  photos: number;
  reg: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Asset {
  id: string;
  pid: string;
  code: string;
  name: string;
  qty: number;
  unit: string;
  ok: boolean;
  loc: string;
  obs: string;
  fecha: string;
}

export interface WorkEntry {
  id: string;
  pid: string;
  fecha: string;
  hora: string;
  nota: string;
  photos: number;
  reg: string;
  edit: string | null;
}

export interface Additional {
  id: string;
  pid: string;
  code: string;
  name: string;
  unit: string;
  qty: number;
  pu: number;
  motivo: string;
  status: 'approved' | 'pending' | 'rejected';
  fecha: string;
  total: number;
}

export type Screen = 'login' | 'home' | 'projects' | 'new-proj' | 'proj' | 'cam' | 'users' | 'chart' | 'me';
