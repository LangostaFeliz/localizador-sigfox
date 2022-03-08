import { useState } from 'react'
import styles from './SearchForm.module.css'
function SearchBySequenceForm({ searchForm, submit, onChangeSubmit }) {

    const [typeForm, setTypeForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        onChangeSubmit()
    }

    function setStartDate(e){
        let time= new Date(e.target.value).getTime() / 1000
        searchForm.setFieldValue("startData",time)
    }

    function setEndDate(e){
        let time= new Date(e.target.value).getTime() / 1000
        searchForm.setFieldValue("endData",time)
    }

    function onChangeTypeForm() {
        typeForm ?  searchForm.setFieldValue("type", "sequence"):searchForm.setFieldValue("type", "date") 
        setTypeForm(!typeForm)
        console.log(searchForm.values)
    }
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <button
                    className={styles.selectButtonType}
                    onClick={onChangeTypeForm}
                    style={{ backgroundColor: typeForm ? "#f2f2f2" : "grey" }}
                >Sequence</button>

                <button
                    className={styles.selectButtonType}
                    onClick={onChangeTypeForm}
                    style={{ backgroundColor: !typeForm ? "#f2f2f2" : "grey" }}
                >Fecha</button>
            </div>
            <form className={styles.form}>
                {/* Formulario para secuencia */}
                {!typeForm && <div>
                    <div className={styles.inputGroup}>
                        <label>deviceID:</label>
                        <input className={styles.input}
                            id="deviceID"
                            name="deviceID"
                            onChange={searchForm.handleChange}
                            value={searchForm.values.deviceID}
                        ></input>
                    </div>
                    <p>Secuencia</p>
                    <div className={styles.inputGroup}>
                        <label> inicial:</label>
                        <input
                            className={styles.input}
                            id='startData'
                            name='startData'
                            onChange={searchForm.handleChange}
                            value={searchForm.values.startData}
                        ></input>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}> final:</label>
                        <input className={styles.input}
                            id='endData'
                            name='endData'
                            onChange={searchForm.handleChange}
                            value={searchForm.values.endData}
                        ></input>
                    </div>
                </div>}

                {typeForm && <div>
                    <div className={styles.inputGroup}>
                        <label>deviceID:</label>
                        <input className={styles.input}
                            id="deviceID"
                            name="deviceID"
                            onChange={searchForm.handleChange}
                            value={searchForm.values.deviceID}
                        ></input>
                    </div>
                    <p>Fecha</p>
                    <div className={styles.inputGroup}>
                        <label> inicial:</label>
                        <input
                            className={styles.inputDate}
                            id='startData'
                            name='startData'
                            type='date'
                            onChange={setStartDate}
                        ></input>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}> final:</label>
                        <input className={styles.inputDate}
                            id='endData'
                            name='endData'
                            type='date'
                            onChange={setEndDate}
                        ></input>
                    </div>
                </div>}
                <button onClick={handleSubmit} className={styles.submitButton}>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBySequenceForm
