import styled from 'styled-components';

export const Wrapper = styled.div`
  &:active {
    transition: transform 300ms ease;
    transition: all 300ms ease-out;
  }
  
  &:hover{
    z-index: 1;
    transform: scale(1.05) perspective(90px) rotateX(0.15deg);
    cursor: pointer;
  }

  position: relative;
  height: 250px;
  width: 250px;
  background-color: #ffffff;
  margin: 2rem;
  border-radius: 10px;
  box-shadow:  20px 20px 60px #d9d9d9,
  -20px -20px 60px #ffffff;
  transition: transform 300ms ease;
  transition: all 300ms ease-out;
`;

export const DotWrapper = styled.div`
  text-align: center;
  position: relative;
`;

export const Image= styled.img`
  border-radius:  10px 10px 0px 0px;
  width: 100%;
  min-height: 140px;
  max-height: 140px;
  overflow: hidden;
  object-fit: cover;
`;

export const Title = styled.h2`
  padding: 1rem 1rem 0 1rem;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  min-height: 4rem;
`;