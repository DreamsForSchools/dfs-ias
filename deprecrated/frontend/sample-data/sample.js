'use strict';

const userComp = React.createElement;

function uploadDefualtLogo(props){
    const [uploadInfo, setUploadInfo] = React.useState('Logo Not uploaded!');
    const uploadLogo = () =>{
        setUploadInfo('Logo Uploaded!');
    };

    const uploadButton = userComp(
        'button',
        { onClick: () => uploadLogo()},
        'Upload Defualt DFS Logo');
    const uploadText = userComp(
        'p',
        {},
        uploadInfo
    );
    
    return userComp('div',{},uploadButton,uploadText)
}


ReactDOM.render(
    userComp(uploadDefualtLogo),
    document.getElementById('root')
);
  