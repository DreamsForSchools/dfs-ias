import styled from 'styled-components';
import { color } from "../../style";

export const Wrapper = styled.div`
  margin: 1.5rem;
`;

export const BadgeContainer = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  .badge {
    margin: 0.2rem;
    font-weight: 400;
    padding: 0.5rem 1.2rem;
    font-size: 1rem; 
  }
`;

export const TagContainer = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  .badge {
    margin: 0.2rem;
    font-weight: 400;
    padding: 0.5rem 1.2rem;
    font-size: 1rem; 
  }
`;


export const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
`;

export const Subtitle = styled.h5`
  margin-bottom: 2rem;
`;

export const Text = styled.p`
    margin: 0;
`;

export const PartnerProgramSection = styled.div`
    ${({programColor}) => `
        background-color: ${programColor};
    `
    };
  
  color: white;
  width: 100%;
  border-radius: 10px;
  padding: 0.8rem;
  margin: 1rem 0;
`;

export const ProgramSection = styled.div`
  background-color: ${color.neutral.EGGSHELL};
  width: 100%;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

export const Image = styled.img`
  width: 100%;    
`;

export const Avatar = styled.img`
  width: 200px;    
`;

export const PartnerSymbol = styled.span`
  height: 100%;
  font-size: 6rem;
`;