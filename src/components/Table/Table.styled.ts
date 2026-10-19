import styled from "styled-components";

export const TableSt = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: Inter, sans-serif;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    
    th, td{
        padding: 14px 16px;
        text-align: left;
    }
`

export const TheadSt = styled.thead`
    background: #6E8B3D;
    color: white;
    font-size: 14px;
`

export const TBodySt = styled.tbody`

    tr{
        border-bottom: 1px solid #f1f1f1;
        transition: 0.2s;

        &:hover {
            background-color: #f9fafb;
        }
    }

    td {
        font-size: 14px;
        color: #333;
    }


`

