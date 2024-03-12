import styled from 'styled-components/native';
import { widthPercent, heightPercent } from '../../config/dimension/Dimension';

export const TabBarView = styled.View`
    width: ${widthPercent * 24}px;
    height: ${heightPercent * 24}px;
`;

export const TabNavigatorStyle = {
  tabBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: heightPercent * 10,
    backgroundColor: 'white',
  },
};
