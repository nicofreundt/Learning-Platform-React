import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { PictureAsPdf, Description, Image, Close } from '@material-ui/icons';
import { Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import './newTask.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function NewTask(props) {
    const [fileName, setFileName] = React.useState('');
    const [fileType, setFileType] = React.useState();
    const [fileContent, setFileContent] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [thema, setThema] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [test, setTest] = React.useState(new Map());

    const classes = useStyles();

    const test2 = async (event) => {
        event.preventDefault();
        setUploading(true);

        var images = new FormData();
        for(var [, value] of test.entries()) {
            if(value.type.includes('image')) images.append(value.type, value);
        }

        if(fileName !== '' && level !== '' && thema !== '') {
            const res = await uploadImages(images).then(r => r.json());
            console.log(res);
            await newTask(images, res);
            setUploading(false);
            alert("Task successfully uploaded");
        } else {
            setUploading(false);
            alert("Check your Input");
        }
    }

    const newTask = async (images, imageNames) => {
        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ Titel: fileName, Text: fileContent, Level: level, Thema: thema, Images: imageNames })
        }
        const res = await fetch('/tasks/new', options).then(res => res.json());

        return res;
    }

    const uploadImages = async (images) => {
        const options = {
            method: 'POST',
            body: images
        }
        const res = await fetch('/images/upload', options)

        return res;
    }

    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    }

    const handleChangeThema = (event) => {
        setThema(event.target.value);
    }

    const onDrop = useCallback((acceptedFiles) => {
        setLoading(true)
        acceptedFiles.forEach((file) => {
            setFileType(file.name.split('.')[1])
            console.log(file.type)
            const fi = test;
            fi.set(file.name, file);
            setTest(fi);
            if(file.type === "text/plain" || file.type === "text/html") {
                setFileName(file.name.split('.')[0])
                const reader = new FileReader()

                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const binaryStr = reader.result
                    setFileContent(binaryStr)
                    setLoading(false)
                }
                reader.readAsText(file)
            }
        })
        setLoading(false);
    }, [test])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <>
        {
            uploading ?

            <CircularProgress />

            :

            <div className="root">
                <Button className="exitButton" onClick={() => props.closeNewTask()}><Close/> Zurück</Button>
                <div className="taskDisplay">
                    {fileName && (loading ? <CircularProgress/> : <>
                        {fileType != null && (fileType === 'pdf' ? <PictureAsPdf fontSize="large"/> : <Description fontSize="large"/>)}
                    </>)}
                    {fileName && fileName}
                </div>
                <div className="inputSelectorBox">
                    <FormControl className={"inputSelector " + classes.FormControl}>
                        <InputLabel id="demo-simple-selected-label">Thema</InputLabel>
                        <Select 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={thema}
                            onChange={handleChangeThema}
                        >
                            <MenuItem value="Python">Python</MenuItem>
                            <MenuItem value="Java">Java</MenuItem>
                            <MenuItem value="DB">DB</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={"inputSelector " + classes.FormControl}>
                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                        <Select 
                            labelId="demo-simple-selec-label"
                            id="demo-simple-selec"
                            value={level}
                            onChange={handleChangeLevel}
                        >
                            <MenuItem value="Anfänger">Anfänger</MenuItem>
                            <MenuItem value="Fortgeschritten">Fortgeschritten</MenuItem>
                            <MenuItem value="Profi">Profi</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <form className="dropForm" onSubmit={(e) => test2(e)}>
                    <p>Text: </p>
                    <div {...getRootProps()} className="dropBox">
                        <input name="textFile" {...getInputProps()} />
                        <div>
                            {Array.from(test).filter(([key, value]) => value.type.includes('text')).length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                            {test && Array.from(test).filter(([key, value]) => value.type.includes('text')).map(([key, value]) => <p className="imageListElement" key={key}><Description/> - {value.name.split('.')[0]}</p>)}
                        </div>
                    </div>
                    <p>Images: </p>
                    <div {...getRootProps()} className="dropBox">
                        <input name="textFile" {...getInputProps()} />
                        <div>
                            {Array.from(test).filter(([key, value]) => value.type.includes('image')).length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                            {test && Array.from(test).filter(([key, value]) => value.type.includes('image')).map(([key, value]) => <p className="imageListElement" key={key}><Image/>  - {value.name.split('.')[0]}</p>)}
                        </div>
                    </div>
                    <Button type="submit" variant="outlined" color="primary">Upload</Button>
                </form>
            </div>

        }
        </>
        
    )
}

export default NewTask;