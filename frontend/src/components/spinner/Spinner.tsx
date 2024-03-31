import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

interface SpinnerProps {
    size: number | 'small' | 'large';
    color: string;
    children: React.ReactNode
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
/**
 * 로딩 상태를 나타내는 스피너 컴포넌트입니다.
 *
 * @component
 * @example
 * <Spinner
 *   size="large"
 *   color="#0000ff"
 * >
 *   <Text>Loading...</Text>
 * </Spinner>
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {'small' | 'large' | number} props.size - 스피너의 크기입니다. 'small', 'large', 또는 숫자를 지정할 수 있습니다.
 * @param {string} props.color - 스피너의 색상입니다.
 * @param {React.ReactNode} props.children - 스피너 아래에 표시될 추가적인 컨텐츠입니다.
 *
 * @author 오민상
 */

const Spinner = (props: SpinnerProps) => {
    return (
        <Container>
            <ActivityIndicator size={props.size} color={props.color}/>
            {props.children}
        </Container>
    );
};

export default Spinner;
