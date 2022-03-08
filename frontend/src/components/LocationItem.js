
import styles from "./LocationItem.module.css";
import { BsFillBackspaceReverseFill } from "react-icons/bs";
function LocationItem({ data,width,onchangeShowDataState}) {


    return <div className={styles.container} style={{width:width}}>
        <div className={styles.text}>
            <button className={styles.backButton} onClick={onchangeShowDataState}><BsFillBackspaceReverseFill className={styles.backIcon}/></button>
            <p>Device ID:{data && data.deviceID}</p>
            <p>Ubicacion:{data && data.nearestPlace}</p>
            <p>Secuencia {data && data.sequence}</p>
            <p>Latitud:{data &&  data.coordinates.lat}</p>
            <p>Longitud:{data && data.coordinates.lng}</p>
            <p>Fecha:   {data && new Date(data.createdAt*1000).toISOString()}</p>
            <p>{data && data.words}</p>
            <a>{data &&  data.map}</a>
        </div>
    </div>;
}

export default LocationItem;
