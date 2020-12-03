import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { PictureAsPdf, Description } from '@material-ui/icons';
import { Button, FormControl, InputLabel, MenuItem, Select, CircularProgress, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function NewTask() {
    const [fileName, setFileName] = React.useState('');
    const [fileType, setFileType] = React.useState();
    const [fileContent, setFileContent] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [thema, setThema] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    const addTask = async (event) => {
        event.preventDefault();

        //console.log(new FormData(formData.current));
        const target = event.target;
        const formData = new FormData(target)

        for(var i of formData.getAll('upload-photo')) {
            console.log(i);
        }

        formData.delete( 'textFile' );

        const options = {
            method: 'POST',
            body: formData
        }

        await fetch('/images/upload', options).then(res => console.log(res));


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ Titel: fileName, Text: fileContent, Level: level, Thema: thema })
        }

        const res = fetch('/tasks/new', requestOptions).then(res => res.json());

        res.then(res => res.status === 200 ? alert('Aufgabe erfolgreich hinzugefügt!') : alert('Something went wrong!'))
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
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div style={{transform: "translateY(-50%)", marginTop: "25%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "25px"}}>
                {loading ? <CircularProgress/> : <>
                    {fileType != null && (fileType === 'pdf' ? <PictureAsPdf fontSize="large"/> : <Description fontSize="large"/>)}
                </>}
                {fileName && fileName}
            </div>
            <div style={{width: "30vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginBottom: "25px"}}>
                <FormControl style={{width: "40%"}} className={classes.FormControl}>
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
                <FormControl style={{width: "40%"}} className={classes.FormControl}>
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
            <form onSubmit={(e) => addTask(e, )}>
                <div {...getRootProps()} style={{width: "30vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <p>Text: </p>
                    <input name="textFile" accept=".txt, .html" {...getInputProps()} />
                    <div style={{width: "100%", height: "20vh", border: "1px solid white", background: "#121212", cursor: "pointer"}}></div>
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <label htmlFor="upload-photo">
                    <input
                    style={{ display: "none" }}
                    multiple={true}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    />
                    <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                    >
                        <AddIcon /> Upload photo
                    </Fab>
                </label>
                <Button type="submit" variant="outlined" color="primary">Upload</Button>
            </form>
        </div>
    )
}

export default NewTask;