import React from 'react'
import {Box,Typography} from "@mui/material"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
   root: {
    width: '100%',
    height:200,
    backgroundColor:'green',

   },
   typography:{
       margin:20
   }

}))


const Footer = () => {
    const classes=useStyles()
    return (
        <Box className={classes.root}>
            <Typography className={classes.typography}> Localizador-sigfox-CITEDI-IPN</Typography>
        </Box>
    )
}

export default Footer
