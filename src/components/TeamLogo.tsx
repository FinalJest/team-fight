import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentSize } from '../enums/ComponentSize';
import { ITeam } from '../types/ITeam';
import { Path } from '../enums/Path';

const SIZE_TO_DIMENSION: Record<ComponentSize, number> = {
    [ComponentSize.S]: 32,
    [ComponentSize.M]: 64,
    [ComponentSize.L]: 128,
};

interface LogoProps {
    size: ComponentSize;
}

const StyledLogo = styled.img<LogoProps>`
    width: ${({ size }) => SIZE_TO_DIMENSION[size]}px;
    height: ${({ size }) => SIZE_TO_DIMENSION[size]}px;
    background-color: #f3f3f3;
    border-radius: 8px;
    border: 1px solid black;
`;

interface TeamLogoProps {
    id?: ITeam['id'];
    size?: ComponentSize;
    src?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ id, size = ComponentSize.S, src }) => (id !== undefined
    ? (
        <div>
            <Link to={`/${Path.Teams}/${id}`}>
                <StyledLogo size={size} src={src} />
            </Link>
        </div>
    )
    : <div><StyledLogo size={size} src={src} /></div>);
