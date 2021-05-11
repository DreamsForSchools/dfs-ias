import React from "react";
import { Wrapper, Title, Image} from './Styled';
import Dot from '../../../../design-system/dots';
import {ProgramSection, TagContainer} from "../../SideInfo";
import {Badge} from "react-bootstrap";
// dummy data


export const ProgramCard = ({ item, onClick }) => {
   const [imageBase64, setImageBase64] = React.useState(null);

   React.useEffect(() => {
       setImageBase64(new Buffer.from(item.logo.data).toString("ascii"))
   }, []);

   return (
        <Wrapper onClick={() => onClick(item)} color={item.color} >
            <Image src={imageBase64}/>
            <Title>{item.name}</Title>
        </Wrapper>
    )
}