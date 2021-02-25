import React from 'react';
import OptionsBar from './OptionsBar';
import './Programs.scss';
import Card from '../../components/Card';

const DUMMY_DATA = [
    {name: "AppJam", color: "black", logo: "https://media-exp1.licdn.com/dms/image/C560BAQEqVUF6hTLzaQ/company-logo_200_200/0/1547068849793?e=2159024400&v=beta&t=579oZ0aNyoxEmS-txIZaLlDsPd-GVR03zpmsObt9Iy0"},
    {name: "WebJam", color: "red", logo: "https://media-exp1.licdn.com/dms/image/C560BAQEqVUF6hTLzaQ/company-logo_200_200/0/1547068849793?e=2159024400&v=beta&t=579oZ0aNyoxEmS-txIZaLlDsPd-GVR03zpmsObt9Iy0"},
    {name: "LESTEM", color: "green", logo: "https://media-exp1.licdn.com/dms/image/C560BAQEqVUF6hTLzaQ/company-logo_200_200/0/1547068849793?e=2159024400&v=beta&t=579oZ0aNyoxEmS-txIZaLlDsPd-GVR03zpmsObt9Iy0"},
    {name: "Engineering Inventors", color: "purple", logo: "https://media-exp1.licdn.com/dms/image/C560BAQEqVUF6hTLzaQ/company-logo_200_200/0/1547068849793?e=2159024400&v=beta&t=579oZ0aNyoxEmS-txIZaLlDsPd-GVR03zpmsObt9Iy0"},
    {name: "Scratch", color: "yellow", logo: "https://media-exp1.licdn.com/dms/image/C560BAQEqVUF6hTLzaQ/company-logo_200_200/0/1547068849793?e=2159024400&v=beta&t=579oZ0aNyoxEmS-txIZaLlDsPd-GVR03zpmsObt9Iy0"}
]

function Programs() {
  return (
    <div className="programs_page">
        <div className={"program-gallery_container"}>
            <OptionsBar />
            <div className={'program-gallery'}>
                {
                    DUMMY_DATA.map((el, index) =>
                        <Card item={el} id={index}/>
                    )
                }
            </div>
        </div>
        <div className={"program-side-info_container"}>


        </div>
    </div>
  );
}
export default Programs;