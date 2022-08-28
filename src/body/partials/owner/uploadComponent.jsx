import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './main.css'
import CircularProgress from '@material-ui/core/CircularProgress';


function Uploader(props){

    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        if(props.file) {
            Upload()
        }
    },[props.file])
    

    function Upload() {
        setIsLoading(true)
        var formData = new FormData()
        formData.append('File', props.file, props.fileName)

        fetch(`${process.env.REACT_APP_UPLOAD_ENDPOINT}`, {
            method: 'POST',
            body: formData,
        }).then(response => {

            var imageData = response.json()
            imageData.then(data => {
                props.handler(data.data[0].serve_link)  
                if(props.sizeHandler) {
                    props.sizeHandler({
                        width: data.data[0].width,
                        height: data.data[0].height
                    })
                }
                setIsLoading(false)       
            })

        }).catch((error) => {
            console.log(error);
        })
    }

    const fileSelectorHandler = (e) => {
        props.fileHandler(e.target.files[0])
    }

    return (
        <div style={{marginTop: 20}}>
            <div>
                {isLoading ? (
                    <CircularProgress color="secondary"/>
                ) : (             
                    props.isSong ? ( 
                        props.src !== "" && (
                            <audio controls width={'50%'}>
                                <source src={props.src} type="audio/mpeg"/>
                                Your browser does not support the audio tag.
                            </audio>
                        )
                  ) : (<img src={props.src} style={{width: 300}}/>)            
                )}
            </div>
            
            
            <Button variant="contained" for>
                
                <label class="custom-file-upload">
                    <input type="file" onChange={fileSelectorHandler} />
                    {props.buttonName}
                </label>
                
            </Button>
        </div>
    )
}

export default Uploader