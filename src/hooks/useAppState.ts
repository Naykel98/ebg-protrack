import { useState, useCallback } from 'react';
import { User, Project, Advance, Asset, WorkEntry, Additional, Screen } from '../types';

export const useNavigation = (initialScreen: Screen) => {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [history, setHistory] = useState<Screen[]>([]);

  const goTo = useCallback((newScreen: Screen) => {
    setHistory(prev => [...prev, screen]);
    setScreen(newScreen);
  }, [screen]);

  const back = useCallback(() => {
    setHistory(prev => {
      const next = prev.slice(0, -1);
      setScreen(next.length ? next[next.length - 1] : 'home');
      return next;
    });
  }, []);

  const navigate = useCallback((screenId: string) => {
    const screenMap: Record<string, Screen> = { home: 'home', projects: 'projects', users: 'users', cam: 'cam', chart: 'chart', me: 'me' };
    setScreen(screenMap[screenId] || (screenId as Screen));
    setHistory([]);
  }, []);

  return { screen, goTo, back, navigate };
};

export const useProjectData = (initialProjects: Project[]) => {
  const [projects, setProjects] = useState(initialProjects);
  const updateProject = useCallback((updatedProject: Project) => setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p)), []);
  const addProject = useCallback((project: Project) => setProjects(prev => [...prev, project]), []);
  return { projects, updateProject, addProject };
};

export const useUserData = (initialUsers: User[]) => {
  const [users, setUsers] = useState(initialUsers);
  const updateUser = useCallback((userId: string, updates: Partial<User>) => setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u)), []);
  const addUser = useCallback((user: User) => setUsers(prev => [...prev, user]), []);
  return { users, setUsers, updateUser, addUser };
};

export const useAdvanceData = (initialAdvances: Advance[]) => {
  const [advances, setAdvances] = useState(initialAdvances);
  const addAdvance = useCallback((advance: Advance) => setAdvances(prev => [...prev, advance]), []);
  const updateAdvance = useCallback((id: string, status: 'approved' | 'pending' | 'rejected') => setAdvances(prev => prev.map(a => a.id === id ? { ...a, status } : a)), []);
  return { advances, setAdvances, addAdvance, updateAdvance };
};

export const useAssetData = (initialAssets: Asset[]) => {
  const [assets, setAssets] = useState(initialAssets);
  const toggleAsset = useCallback((id: string) => setAssets(prev => prev.map(a => a.id === id ? { ...a, ok: !a.ok, fecha: a.ok ? '' : new Date().toISOString().split('T')[0] } : a)), []);
  const addAsset = useCallback((asset: Asset) => setAssets(prev => [...prev, asset]), []);
  return { assets, setAssets, toggleAsset, addAsset };
};

export const useWorkEntryData = (initialEntries: WorkEntry[]) => {
  const [entries, setEntries] = useState(initialEntries);
  const addEntry = useCallback((entry: WorkEntry) => setEntries(prev => [...prev, entry]), []);
  const editEntry = useCallback((id: string, nota: string, editedBy: string) => setEntries(prev => prev.map(e => e.id === id ? { ...e, nota, edit: editedBy } : e)), []);
  return { entries, setEntries, addEntry, editEntry };
};

export const useAdditionalData = (initialAdditionals: Additional[]) => {
  const [additionals, setAdditionals] = useState(initialAdditionals);
  const addAdditional = useCallback((additional: Additional) => setAdditionals(prev => [...prev, additional]), []);
  const updateAdditional = useCallback((id: string, status: 'approved' | 'pending' | 'rejected') => setAdditionals(prev => prev.map(a => a.id === id ? { ...a, status } : a)), []);
  return { additionals, setAdditionals, addAdditional, updateAdditional, setAdditionals };
};
