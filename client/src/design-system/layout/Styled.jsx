import styled from 'styled-components';
import { color } from '../style';
import { NAVBAR_HEIGHT } from "../../components/NavBar/Styled";

export const Page = styled.div`
  display: flex;
  background: ${color.neutral.LIGHTGRAY};
  height: calc(100vh - ${NAVBAR_HEIGHT});
  overflow: hidden;
  width: 100vw;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const SideInfoWrapper = styled.div`
  width: 550px;
  height: 100%;
  background: white;
  text-align: center;
  overflow-y: scroll;
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem;
`;