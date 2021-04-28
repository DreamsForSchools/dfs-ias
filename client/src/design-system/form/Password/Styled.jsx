import styled from 'styled-components';
import { color } from '../../style';

export const Wrapper = styled.div`
  
  & > div > input {
    ${props => props.modal && `background: ${color.neutral.LIGHTGRAY}`};
    ${props => props.modal && `border: ${color.neutral.LIGHTGRAY}`};
  }

  & > div > input:focus {
    ${props => props.modal && `background: ${color.neutral.LIGHTGRAY}`};
  }
`;