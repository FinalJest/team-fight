import styled from 'styled-components';
import { ComponentSize } from '../enums/ComponentSize';

const SIZE_TO_DIMENSION: Record<ComponentSize, number> = {
    [ComponentSize.S]: 32,
    [ComponentSize.M]: 64,
    [ComponentSize.L]: 128,
};

interface LogoProps {
    size: ComponentSize;
}

export const Logo = styled.img<LogoProps>`
    width: ${({ size }) => SIZE_TO_DIMENSION[size]}px;
    height: ${({ size }) => SIZE_TO_DIMENSION[size]}px;
    background-color: #f3f3f3;
    border-radius: 8px;
    border: 1px solid black;
`;
