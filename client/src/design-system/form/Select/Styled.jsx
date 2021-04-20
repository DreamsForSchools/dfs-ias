import styled from 'styled-components';
import { color } from '../../style';

export const Wrapper = styled.div`
  & > div > select {
    ${props => props.modal && `background-color: ${color.neutral.LIGHTGRAY}`};
    ${props => props.modal && `border: ${color.neutral.LIGHTGRAY}`};
  }

  & > div > select:focus {
    ${props => props.modal && `background-color: ${color.neutral.LIGHTGRAY}`};
  }
`;