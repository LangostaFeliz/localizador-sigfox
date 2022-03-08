import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
    },
    box: {
        height: 300,
        width: 500,
        backgroundColor: '#f2f2f2',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 15,
        alignItems: 'center',
    },
    spacing: {
        marginTop: 15,
    },
    button: {
        marginTop: 20,
        width: 100,
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#9eadb6',
    },
    typography: {
        margin: 20,
    },
    icon: {
        marginTop: 20,
        marginRight: 20,
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    error:{
        color:"red"
    }
}))
export default function SequenceForm({ removeForm, searchForm, setMapData }) {
    const classes = useStyles();
    const [error, setError] = useState();
    console.log(searchForm)
    
    async function submit(e) {
        e.preventDefault();
        let { data } = await axios.get(`https://z66c77vbp1.execute-api.us-east-1.amazonaws.com/dev/getLocationsBySequence/${searchForm.values.deviceID}/${searchForm.values.startData}/${searchForm.values.endData}`)
        console.log(data)
        if (data.length > 0) {
            const newData = data.map((element, index) => {
                element.index = index;
                element.lng = element.coordinates.lng;
                element.lat = element.coordinates.lat;
                element.date = new Date(element.createdAt * 1000).toISOString();
            })
            setMapData(data)
            removeForm()
        }else{
            setError("No hay datos");
        }
    }

    return (
        <Box className={classes.box}>
            <Grid container justifyContent='space-between'>
                <Typography variant='h6' className={classes.typography}>Buscar por Secuencia</Typography>
                <BackspaceIcon className={classes.icon} onClick={removeForm} />
            </Grid>
            <Grid container className={classes.container} direction={'row'}>
                <Grid item className={classes.spacing}>
                    <TextField
                        label={'Secuencia inicio'}
                        id="startData"
                        name="startData"
                        onChange={searchForm.handleChange}
                        values={searchForm.values.startData}
                        helperText={searchForm.errors.startData?searchForm.errors.startData:""}
                        error={searchForm.errors.startData?true:false}
                    />
                </Grid>
                <Grid item className={classes.spacing}>
                    <TextField
                        label={'Secuencia final'}
                        id="endData"
                        name="endData"
                        onChange={searchForm.handleChange}
                        values={searchForm.values.endData}
                        helperText={searchForm.errors.endData?searchForm.errors.endData:""}
                        error={searchForm.errors.endData?true:false}
                    />
                </Grid>
                <Grid item className={classes.spacing}>
                    <TextField label={'Id de dispositivo'}
                        id="deviceID"
                        name="deviceID"
                        helperText={searchForm.errors.deviceID? searchForm.errors.deviceID:""}
                        onChange={searchForm.handleChange}
                        values={searchForm.values.deviceID}
                        error={searchForm.errors.deviceID?true:false}
                    />

                </Grid>

            </Grid>
            {error&& <Typography variant='h6' className={classes.error}>No Hay datos favor de ingresar parametro validos</Typography>}
            <Button className={classes.button} onClick={submit} type="submit" >Buscar</Button>

        </Box>
    );
}