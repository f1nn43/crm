import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import styles from './SettProfile.module.css'
import DragAndDropFile from './DragAndDropFile/DragAndDropFile';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; // Импортируйте модуль storage
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';

const SettProfile = (props) => {
    const [userName, setUserName] = useState(props.user.name)
    const [visible, setVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false)

    const accept = () => {
        const database = firebase.database();
        const ref = database.ref('/users');
        const updatedUsers = props.users

        updatedUsers.forEach(us => {
            if (us.uid === props.user.uid) {
                us.name = userName
            }
        });
        ref.set(updatedUsers)
        toast.success('Ваши изменения сохранены')
        setButtonVisible(false)
    }

    const reject = () => {
        toast.error('Ваши изменения не сохранены')
    }


    const onChangeUserName = (name) => {
        setUserName(name)
        setButtonVisible(true)
    } 

    return(
        <div className={styles.wrapper}>
            <div className={styles.leftside}>
                <div>
                    <h2 className={styles.name}>Имя пользователя</h2>
                    <Inplace closable>
                        <InplaceDisplay>{userName}</InplaceDisplay>
                        <InplaceContent>
                            <InputText value={userName} onChange={(e) => onChangeUserName(e.target.value)} autoFocus />
                        </InplaceContent>
                    </Inplace>
                </div>
                <div>
                    <h2>Ваш отдел:</h2>
                    <span>Отдел набора персонала</span>
                </div>
                <div>
                    <h2>Ваша должность:</h2>
                    <span>Начальник отдела по набору персонала</span>
                </div>
                <div>
                    <h2>Связь:</h2>
                    <span>Телефон: 89261558101</span>
                    <span>Telegram: @egorpetrov</span>
                    <span>Корпоротивная почта: egor@oborona.top</span>
                    <span>Личная почта: petrovegor615@gmail.com</span>
                </div>
                <div>
                    <h2>Вы работаете:</h2>
                    <span>1432 дней ( с 14.02.2017)</span>
                </div>
                <div>
                    <h2>Зарплата через:</h2>
                    <span>10 дней ( с 28.08.2023)</span>
                </div>
                {buttonVisible && (
                    <div className={styles.button__confirm}>
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Вы уверены, что хотите сохранить изменения?"
                            header="Подтверждение" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Сохранить изменения" />
                    </div>
                )}
            </div>
            <div className={styles.rightside}>
                <h1>Ваша аватарка</h1>
                <DragAndDropFile users={props.users} user={props.user} />
            </div>
        </div>
    )
}

export default SettProfile