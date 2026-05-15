import { createContext, useContext } from 'react';
import { PROFILES } from './profiles';

export const ProfileContext = createContext(null);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  return ctx || PROFILES['israeli-progressive'];
}
