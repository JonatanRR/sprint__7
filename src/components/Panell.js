import styled from 'styled-components';

export const Panell = styled.div`
    padding: 15px;
    border: 2px solid black;
    border-radius: 5px;
    width: 40%;
    display: ${({isVisible}) => isVisible ? 'block' : 'none'};

`