import React from "react";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    minWidth: 224,
    maxWidth:280,
    minHeight: 40,
 
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    margin:"auto",
    left: 0,
    right: 0,
    bottom: 41,
    zIndex: 100,
    
  },
  button:{
    textTransform:'lowercase',
    
  }
}));

function SearchOptionButton({onChangeStateDateForm,onChangeStateSequenceForm}) {
  const classes = useStyles();
  return (
    <ButtonGroup className={classes.root} size="large" variant="text" aria-label="Ordenar y filtrar propiedades" fullWidth>
      <Button className={classes.button} onClick={onChangeStateSequenceForm} >
        Secuencia
      </Button>
      <Button className={classes.button} onClick={onChangeStateDateForm}>
        tiempo
      </Button>
    </ButtonGroup>
  );
}

export default SearchOptionButton;