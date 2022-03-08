import { useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
    },
    box: {
        height: 250,
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
    icon:{
        marginTop:20,
        marginRight:20,      
    },
    title:{
        display:'flex',
        justifyContent:'space-between'
    },
    error:{
        color:'red'
    }
}))
export default function DateForm({removeForm,searchForm,setMapData}) {
    const classes = useStyles();
    const [errors,setErrors]=useState()
    function setStartDate(e){
        let time= new Date(e.target.value).getTime() / 1000
        searchForm.setFieldValue("startData",time)
        searchForm.setFieldValue("endData",time+86400)
        console.log(searchForm)
    }

    async function submit(e) {
        e.preventDefault();
        let { data } = await axios.get(`https://z66c77vbp1.execute-api.us-east-1.amazonaws.com/dev/getLocationsByDate/${searchForm.values.deviceID}/${searchForm.values.startData}/${searchForm.values.endData}`)
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
            setErrors("No hay datos");
        }
    }

    return (
        <Box className={classes.box}>
            <Grid container justifyContent='space-between'>
                <Typography variant='h6' className={classes.typography}>Buscar por fecha</Typography>
                <BackspaceIcon className={classes.icon} onClick={removeForm}/>
            </Grid>
            <Grid container className={classes.container} direction={'row'}>
                <Grid item className={classes.spacing}>
                    <TextField label={'Fecha'} id="startData" type='date' onChange={setStartDate}/>
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
            {errors&& <Typography variant='h6' className={classes.error}>No Hay datos favor de ingresar parametro validos</Typography>}
            <Button className={classes.button} type="submit" onClick={submit}>Buscar</Button>
        </Box>
    );
}