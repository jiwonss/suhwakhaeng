import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Color.GREEN50};
  position: 'relative';
`;

const LogoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SplashScreen = () => {
  return (
    <Container>
      <LogoContainer>
        <Typo.H1 color={Color.GREEN600}>수확행</Typo.H1>
      </LogoContainer>
    </Container>
  );
};

export default SplashScreen;
