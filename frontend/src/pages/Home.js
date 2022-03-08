import React from 'react'
import Map from '../components/Map';
import useSearchForm from '../components/form/useSearchForm'
import StickyHeadTable from '../components/StickyHeadTable'
import { useState, useEffect } from 'react'
import { Grid } from "@mui/material"
import SearchOptionButton from '../components/SearchOptionButton'
import SequenceForm from '../components/SequenceForm'
import DateForm from '../components/DateForm';
import Footer from '../components/Footer';
export default function Home() {
  const { searchForm } = useSearchForm()
  const [mapData, setMapData] = useState()
  const [stateDateForm, setStateDateForm] = useState(false)
  const [stateSequenceForm, setStateSequenceForm] = useState(false)
  const [submit, setSubmit] = useState(false)
  function onChangeStateDateForm() {
    setStateDateForm(!stateDateForm)
    setStateSequenceForm(false)
  }
  function onChangeStateSequenceForm() {
    setStateSequenceForm(!stateSequenceForm)
    setStateDateForm(false)
  }
  function removeForm() {
    setStateSequenceForm(false)
    setStateDateForm(false)
    searchForm.setFieldValue("startData", 0);
    searchForm.setFieldValue("endData", 0);
    searchForm.setFieldValue("deviceID", "")
  }


  return (
    <Grid container >
      <Grid item xs={12} md={6}>
        <Map searchForm={searchForm} submit={submit} mapData={mapData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StickyHeadTable mapData={mapData} />
      </Grid>
      

      <SearchOptionButton onChangeStateDateForm={onChangeStateDateForm} onChangeStateSequenceForm={onChangeStateSequenceForm} />
      {stateDateForm && <DateForm removeForm={removeForm} searchForm={searchForm} setMapData={setMapData} />}
      {stateSequenceForm && <SequenceForm removeForm={removeForm} searchForm={searchForm} setMapData={setMapData} />}
      <Footer/>
    </Grid>

  );
}


