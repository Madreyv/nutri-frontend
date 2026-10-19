import styled from "styled-components";
import type { TContainer } from "./Container";

export const ContainerSt = styled.div<TContainer>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    gap: 80px;
    align-items: center;
`