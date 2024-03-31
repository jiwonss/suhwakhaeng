import { atom } from 'recoil';

interface CropInfo {
  myCropsId?: number;
  plantName?: string;
  varietyName?: string;
  cropsVarietyId?: number;
  name?: string;
  area?: number;
  areaUnit?: string;
  yield?: number;
  location?: {
    sido?: string;
    gugun?: string;
    dong?: string;
  };
}

export const myCropsList = atom<CropInfo[]>({
  key: 'myCropsListState',
  default: [],
});
