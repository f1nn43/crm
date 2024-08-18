import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import styles from "./SettFunnels.module.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import SettFunnel from "./SettFunnel/SettFunnel";
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import { toast } from 'react-toastify';

const SettFunnels = (props) => {
    const [funnelName, setFunnelName] = useState('');

    const createFunnel = (e) => {
        e.preventDefault()
        const database = firebase.database();
        const ref = database.ref('/funnels');
        
        let updatedData = props.data;
        updatedData.push({funnelID: uuidv4(), funnelName: funnelName, funnel: []})
        ref.set(updatedData)
        toast.success('Воронка успешно создана')
    }
    return(
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={createFunnel}>
                <span className="p-float-label">
                    <InputText id="funnelName" value={funnelName} onChange={(e) => setFunnelName(e.target.value)} />
                    <label htmlFor="funnelName">Название воронки</label>
                </span>
                <Button type="submit" label="Создать воронку" icon="pi pi-check" />
            </form>
            <ScrollPanel className={styles.scroll} >
                {props.data.map(funnel => 
                    <SettFunnel funnel={funnel} data={props.data}/>
                )}
            </ScrollPanel>
        </div>
    )
}

export default SettFunnels