import styled from 'styled-components';
import { color } from '../../style';



export const Wrapper = styled.div`
  
  & > div > input {
    ${props => props.modal && `background: ${color.neutral.LIGHTGRAY}`};
    ${props => props.modal && `border-color: ${color.neutral.LIGHTGRAY}`};
    ${props => !props.valid && `border-color: ${color.solid.RED}`};  
    ${props => !props.valid && `background: ${color.solid.RED}`};  
    
  }

  
  & > div > input:focus {
    ${props => props.modal && `background: ${color.neutral.LIGHTGRAY}`};
    
  }

  

  
  
`;