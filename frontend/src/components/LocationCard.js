import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 600,
        heigtht: 300,
        transform: 'translate(-50%, -50%)',
        zIndex: 99,
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        transition: '1s',
    }
}))


export default function LocationCard({ location, onChangeShowDataState }) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Device ID:{location && location.deviceID}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Ubicacion:{location && location.nearestPlace}
                    </Typography>
                    <Typography variant="h6" component="div">
                        secuencia:{location && location.sequence}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Latitud:{location && location.coordinates.lat}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Longitud:{location && location.coordinates.lng}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Fecha:{location && new Date(location.createdAt * 1000).toString().slice(0, 24)}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Map:{<a rel="noopener noreferrer" href={location?location.map:"http://maps.google.com"} target="_blank">{location?location.map:"https://w3w.co/"}</a>}
                    </Typography>


                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onChangeShowDataState}>Salir</Button>
                </CardActions>
            </React.Fragment>
        </Box>
    );
}