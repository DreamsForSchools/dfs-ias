import styled from 'styled-components';
import { color } from '../../design-system/style';

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  & > div > div > input {
    background: ${color.neutral.LIGHTGRAY};
    border: ${color.neutral.LIGHTGRAY};
    padding: 0.375rem 0.75rem;
    width: 100%;
    color: #495057;
  }

  & > div > div > input:focus {
    background: ${color.neutral.LIGHTGRAY};
    color: #495057;
  }

`;
export const NAVBAR_HEIGHT = '85px';

