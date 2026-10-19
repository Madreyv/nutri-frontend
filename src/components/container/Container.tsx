import type { ReactNode } from "react";
import { ContainerSt } from "./Container.styled";

export type TContainer={
    direction:"column" | 'row'
    children: ReactNode | ReactNode[]
}

export function Container({direction, children}:TContainer){
    return(
        <ContainerSt direction={direction}>{children}</ContainerSt>
    )
}