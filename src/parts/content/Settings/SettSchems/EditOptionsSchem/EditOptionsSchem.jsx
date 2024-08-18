import React, {useEffect, useRef, useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import styles from './EditOptionsSchem.module.css'
import { InputSwitch } from 'primereact/inputswitch';
import firebase from 'firebase/compat/app';

const EditOptionsSchem = (props) => {
    const [visibleRight, setVisibleRight] = useState(false);
    const [isMoving, setIsMoving] = useState(props.stage.options ? props.stage.options.isMoving : false);
    const [buttonVisible, setButtonVisible] = useState(false)

    const [trigger, setTrigger] = useState(false)

    const [data, setData] = useState('')

    useEffect(() => {
        const database = firebase.database();
        const ref = database.ref('/');

        const handleData = (snapshot) => {
            setData(snapshot.val().funnels);
        };

        ref.on('value', handleData);

        return () => {
            ref.off('value', handleData);
        };
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);
    const onSwitchChange = (e) => {
        setIsMoving(e.value)
        setButtonVisible(true)
    }

    const postOptions = (e) => {
        e.preventDefault()
        const database = firebase.database();
        const ref = database.ref('/funnels');
        const updatedData = props.data
        updatedData.forEach(funnel => {
            funnel.funnel.forEach(stage => {
                if(stage.id === props.stage.id){
                    stage.options.isMoving = isMoving
                }
            })
        });
        ref.set(updatedData)
        setButtonVisible(false)
    }

    return(
        <div className={styles.options}>
            <span>{props.stage.name}</span>
            <Button label="Настроить автоматизацию" onClick={() => setVisibleRight(true)} />
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2>Настройка автоматизации для "{props.stage.name}"</h2>
                <div onSubmit={postOptions}>
                    {trigger ? (
                        <span>Перемещать сделки сюда: <InputSwitch checked={isMoving} onChange={(e) => onSwitchChange(e)}/></span>
                    ) : "Нет настроек"}
                    {buttonVisible && (
                        <Button type='submit' onClick={postOptions} icon="pi pi-check" label="Сохранить изменения" />
                    )}
                    
                </div>
                
            </Sidebar>
        </div>
    )
}

export default EditOptionsSchem