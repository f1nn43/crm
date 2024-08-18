import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import styles from "./SettUsers.module.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import SettUser from "./SettUser/SettUser";

const SettUsers = (props) => {
    return(
        <div className={styles.wrapper}>
            <ScrollPanel className={styles.scroll} >
                {props.users.map(user =>
                    <SettUser user={user} users={props.users}/>
                )}
            </ScrollPanel>
        </div>
    )
}

export default SettUsers