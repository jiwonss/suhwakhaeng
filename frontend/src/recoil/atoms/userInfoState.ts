import { atom } from 'recoil';

/**
 * 임시 userInfoState
 */
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    userId: '',
    email: '',
    nickname: '',
    profileImage: '',
    isBusiness: false,
    profileContent: '',
    sido: '',
    gugun: '',
    dong: '',
    address: '',
    role: '',
  },
});
