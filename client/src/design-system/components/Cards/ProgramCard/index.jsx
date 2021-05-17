import React from "react";
import { Wrapper, Title, Image} from './Styled';

export const ProgramCard = ({ item, onClick }) => {
   const [imageBase64, setImageBase64] = React.useState(null);

   React.useEffect(() => {
       setImageBase64(new Buffer.from(item.logo.data).toString("ascii"))
   }, []);

   return (
        <Wrapper onClick={() => onClick(item.programId)} color={item.color} >
            <Image src={imageBase64}/>
            <Title>{item.name}</Title>
        </Wrapper>
    )
}