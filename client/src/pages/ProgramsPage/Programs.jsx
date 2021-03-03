import React, {useState} from 'react';
import OptionsBar from './OptionsBar';
import './Programs.scss';
import './OptionsBar.scss';
import Card from '../../components/Card';
import AppJam_Logo from "../../assets/MobileDevLogo.png";
import WebJam_Logo from "../../assets/WebDevLogo.png";
import Lestem_Logo from "../../assets/LESTEMLogo.png";
import Efk_Logo from "../../assets/EFKLogo.png";
import Scratch_Logo from "../../assets/ScratchLogo.png";



function Programs() {
    const [data, setData] = useState([
        {name: "AppJam", color: "black", logo: AppJam_Logo, tag:"DFS Programs"},
        {name: "WebJam", color: "red", logo: WebJam_Logo, tag:"DFS Programs"},
        {name: "LeStem", color: "green", logo: Lestem_Logo, tag:"Public Schools"},
        {name: "Engineering Inventors", color: "purple", logo: Efk_Logo, tag:"Non-profit Partners"},
        {name: "Scratch", color: "yellow", logo: Scratch_Logo, tag:"Housing Community"}
    ]);
    const [viewType, setViewType] = useState("Programs");
    const [filterType, setFilterType] = useState("All");

    function getViewType(type) {
        setViewType(type);
        if(type === "Programs") {
            setData( [
                {name: "AppJam", color: "black", logo: AppJam_Logo, tag:"DFS Programs"},
                {name: "WebJam", color: "red", logo: WebJam_Logo, tag:"DFS Programs"},
                {name: "LeStem", color: "green", logo: Lestem_Logo, tag:"Public Schools"},
                {name: "Engineering Inventors", color: "purple", logo: Efk_Logo, tag:"Non-profit Partners"},
                {name: "Scratch", color: "yellow", logo: Scratch_Logo, tag:"Housing Community"}
                ]);
        } else{
            setData( [
                {name: "Edison Elementary School", color: "black", logo: "https://www.gusd.net/cms/lib/CA01000648/Centricity/ModuleInstance/1993/large/Edison%20Elementary%20Front.jpg", tag:"Public Schools"},
                {name: "Alta Charter School", color: "red", logo: "https://schoolmint-assets.s3.amazonaws.com/lausdschoolsearch/upload/p4y6x1_Alta%20California.jpg", tag:"Private Schools"},
                {name: "Turner High School", color: "green", logo: "https://www.turnerconstruction.com/Files/ProjectImage?url=%2Fsites%2Fmarketingstories%2FMarketing%2520Story%2520Images%2Foriginal.8d0ac363-e0cd-4911-8ea0-e598682a52fa.jpg&width=707&height=470&crop=True&jpegQuality=95", tag:"Public Schools"},
                {name: "Berkley High School", color: "purple", logo: "https://i0.wp.com/www.dailycal.org/assets/uploads/2018/08/BHS_ChenGong_file-698x450.jpg?ssl=1", tag:"Public Schools"},
                {name: "Irvine Community Center", color: "purple", logo: "https://ei.marketwatch.com/Multimedia/2019/05/20/Photos/ZQ/MW-HJ914_BNIRBe_20190520150242_ZQ.jpg?uuid=d8a3b3c4-7b31-11e9-bf02-9c8e992d421e", tag:"Housing Community"},
                {name: "Bloom Foundation", color: "purple", logo: "https://images.squarespace-cdn.com/content/v1/5dcc60ee9b50f1429aceb553/1580465469292-HES155P0ZF86BCBT9J19/ke17ZwdGBToddI8pDm48kBev1jCTHhfMggHZeq8iG4BZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpw--afqNaTtD4llbkIP7lK59WKqKDVq6YNZmIrRfNqow9Qde5juP5k1GMq7i4XZu60/Bloom_Partners_Artboard%2B20.png", tag:"Non-profit Partners"}
            ]);
        }
    }

    function getfilterType(type){
        setFilterType(type)
    }

    return (
        <div className="programs_page">
            <div className={"program-gallery_container"}>
                <OptionsBar viewType={getViewType} filterType={getfilterType}/>
                <div className={'program-gallery'}>
                    {
                        data.map((el, index) =>
                            <Card item={el} id={index} viewType={viewType} filterType={filterType}/>
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