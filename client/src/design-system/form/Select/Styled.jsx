import styled from 'styled-components';
import { color } from '../../style';

export const Wrapper = styled.div`
  ${props => !props.modal && `display: flex; align-items: center;`};
  & > label {
    ${props => !props.modal && `margin-right: 1rem;`};
  }

  & > div {
    ${props => !props.modal && `margin: 0`};
  }
  
  & > div > select {
    ${props => props.modal && `background-color: ${color.neutral.LIGHTGRAY}`};
    ${props => props.modal && `border: ${color.neutral.LIGHTGRAY}`};
  }

  & > div > select:focus {
    ${props => props.modal && `background-color: ${color.neutral.LIGHTGRAY}`};
  }
`;