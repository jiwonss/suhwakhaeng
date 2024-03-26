import { atom } from 'recoil';

export const tokenState = atom<boolean | null>({
  key: 'tokenState',
  default: true,
});
