import styled from "styled-components";

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 280px;
  font-family: Inter, sans-serif;
`

export const LabelSt = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #444;
`

export const SelectSt = styled.select`
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #d0d5dd;
    background-color: #fff;
    font-size: 14px;
    transition: 0.2s;
    outline: none;
    cursor: pointer;

    &:hover {
        border-color: #7c3aed;
    }

    &:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    }
`