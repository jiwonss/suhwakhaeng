import { Dimensions } from 'react-native';

// 피그마에서 정의한 해상도
const FIGMA_WIDTH: number = 360;
const FIGMA_HEIGHT: number = 800;

export const widthPercent: number = parseFloat((Dimensions.get('screen').width * (1 / FIGMA_WIDTH)).toFixed(2));
export const heightPercent: number = parseFloat((Dimensions.get('screen').height * (1 / FIGMA_HEIGHT)).toFixed(2));
