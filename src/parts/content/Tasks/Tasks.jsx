import { useState } from 'react'
import styles from './Tasks.module.css'
import firebase from 'firebase/compat/app';
import Task from './Task/Task';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'; 
import { ScrollPanel } from 'primereact/scrollpanel';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Mention } from 'primereact/mention';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import notification from '../../Functions/notification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = (props) => {
    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [taskDeadline, setTaskDeadline] = useState('')
    const [taskId, setTaskId] = useState('')
    const [timer, setTimer] = useState('')
    const [dater, setDater] = useState('')

    const [taskFor, setTaskFor] = useState('');
    const [customers, setCustomers] = useState(props.users);
    const [suggestions, setSuggestions] = useState([]);

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    const postTask = (e) => {
        e.preventDefault();
        const database = firebase.database();
        const ref = database.ref('/users');
        if(taskName.trim()){
            if(taskDesc.trim()){
                if (taskDeadline) {
                    const day = taskDeadline.getDate().toString().padStart(2, '0');
                    const month = (taskDeadline.getMonth() + 1).toString().padStart(2, '0');
                    const year = taskDeadline.getFullYear().toString().slice(-2);
                    const hours = taskDeadline.getHours().toString().padStart(2, '0');
                    const minutes = taskDeadline.getMinutes().toString().padStart(2, '0');
                    const seconds = taskDeadline.getSeconds().toString().padStart(2, '0');

                    const taskTime = `${hours}:${minutes}:${seconds}`
                    const taskDate = `${day}.${month}.${year}`

                    const updatedUsers = props.users
                    if (taskFor.trim()) {
                        const nn = taskFor.slice(1, taskFor.length).trim()
                        let triggerFlagTaskFor = false;
                        updatedUsers.forEach(us => {
                            if (us.nickname === nn) {
                                us.tasks.push({
                                    id: uuidv4(),
                                    name: taskName,
                                    desc: taskDesc,
                                    taskFor: nn,
                                    isDone: false,
                                    deadlineTime: taskTime,
                                    deadlineDate: taskDate,
                                    currentTime: getCurrentTime(),
                                    currentDate: getCurrentDate()
                                })
                                triggerFlagTaskFor = true
                                toast.success('Новая задача успешно создана для пользователя - ' + us.name)
                            }
                        });
                        if (!triggerFlagTaskFor) {
                            toast.error('Такого пользователя не существует')
                        }
                    } else {
                        updatedUsers.forEach(us => {
                            if (us.uid === props.user.uid) {
                                us.tasks.push({
                                    id: uuidv4(),
                                    name: taskName,
                                    desc: taskDesc,
                                    taskFor: us.nickname,
                                    isDone: false,
                                    deadlineTime: taskTime,
                                    deadlineDate: taskDate,
                                    currentTime: getCurrentTime(),
                                    currentDate: getCurrentDate()
                                })
                                toast.success('Новая задача успешно создана')
                            }
                        });
                    }

                    ref.set(updatedUsers)
                    setTaskName('')
                    setTaskDesc('')
                    setTaskDeadline('')
                    setTaskFor('')
                } else {
                    toast.error('Укажите дату дедлайна')
                }
            } else {
                toast.error('Укажите подробное описание задачи')
            }
        } else {
            toast.error('Укажите название задачи')
        }
    }

    setInterval(() => {
        setTimer(getCurrentTime())
        setDater(getCurrentDate())
    }, 1000)

    const deleteTask = (id) => {
        const database = firebase.database();
        const ref = database.ref('/users');
        const updatedUsers = props.users
        updatedUsers.forEach(us => {
            if (us.uid === props.user.uid) {
                const tsks = [];
                us.tasks.forEach((task) => {
                    if (!(task.id === id)) {
                        tsks.push(task)
                    }
                })
                us.tasks = tsks
            }
        })
        ref.set(updatedUsers)
    }

    const doTask = (id) => {
        const database = firebase.database();
        const ref = database.ref('/users');
        const updatedUsers = props.users
        updatedUsers.forEach(us => {
            if (us.uid === props.user.uid) {
                us.tasks.forEach((task) => {
                    if (task.id === id) {
                        task.isDone = true
                    }
                })
            }
        })
        ref.set(updatedUsers)
    }

    const onSearch = (event) => {
        //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
        setTimeout(() => {
            const query = event.query;
            let suggestions;

            if (!query.trim().length) {
                suggestions = [...customers];
            }
            else {
                suggestions = customers.filter((customer) => {
                    return customer.nickname.toLowerCase().startsWith(query.toLowerCase());
                });
            }

            setSuggestions(suggestions);
        }, 250);
    }

    const itemTemplate = (suggestion) => {
        // const src = 'https://primefaces.org/cdn/primereact/images/avatar/' + suggestion.representative.image;

        return (
            <div className="flex align-items-center">
                <img src={suggestion.avatar} alt={suggestion.name} width="32" />
                <span className={styles.suggestionInfo}>
                    {suggestion.name}
                    <small style={{ fontSize: '.75rem', color: 'var(--text-secondary-color)' }}>@{suggestion.nickname}</small>
                </span>
            </div>
        );
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper__inner}>
                <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1">
                        {props.user.tasks.map(tsk =>{
                            if (tsk.isDone === false) {
                                return(
                                    <div className={styles.task}>
                                        <Accordion className={styles.accordion}>
                                            <AccordionTab header={
                                                <div className={styles.task__quickinfo}>
                                                    {tsk.name}
                                                    <div className={styles.task__deadline}>
                                                        Дедлайн: {tsk.deadlineTime} {tsk.deadlineDate}
                                                        {tsk.deadlineTime === timer && tsk.deadlineDate === dater && 'Просрочено'}
                                                    </div>
                                                </div>
                                            }>
                                                <Task users={props.users} user={props.user} task={tsk} />
                                            </AccordionTab>
                                        </Accordion>
                                        <Button icon="bx bx-check" aria-label="Filter" onClick={() => doTask(tsk.id)} />
                                        <Button icon="bx bx-x" severity="danger" aria-label="Cancel" onClick={() => deleteTask(tsk.id)} />
                                    </div>
                                )
                            } else {
                                return(
                                    <div className={styles.task}>
                                        <Accordion className={styles.accordion}>
                                            <AccordionTab header={
                                                <div className={styles.task__quickinfo}>
                                                    {tsk.name}
                                                    <div className={styles.task__deadline}>
                                                        Выполнено
                                                    </div>
                                                </div>
                                            }>
                                                <Task users={props.users} user={props.user} task={tsk} />
                                            </AccordionTab>
                                        </Accordion>
                                        <Button icon="bx bx-x" severity="danger" aria-label="Cancel" onClick={() => deleteTask(tsk.id)} />
                                    </div>
                                )
                            }
                        }
                        )}
                </ScrollPanel>    
                <form onSubmit={postTask} className={styles.form}>
                    <span className="p-float-label">
                        <InputText id="name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                        <label htmlFor="name">Название задачи</label>
                    </span>
                    <span className="p-float-label">
                        <InputTextarea id="desc" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} rows={5} cols={30} />
                        <label htmlFor="desc">Подробное описание задачи</label>
                    </span>
                    <span className="p-float-label">
                        <Calendar inputId='deadlineDate' value={taskDeadline} onChange={(e) => setTaskDeadline(e.value)} showTime hourFormat="24"/>
                        <label htmlFor="deadlineDate">Выберите дату дедлайна</label>
                    </span>
                    <span className="p-float-label">
                        <Mention inputId='taskFor' value={taskFor} onChange={(e) => setTaskFor(e.target.value)} suggestions={suggestions} onSearch={onSearch} field="nickname"
                            placeholder="Напишите @ чтобы отметить человека. Если Вы ставите себе задачу указывать себя не обязательно" rows={5} cols={40} itemTemplate={itemTemplate} autoResize />
                        <label htmlFor="taskFor">Ответсвенный</label>
                    </span>
                    <button type='submit'>Добавить задачу</button>
                </form>
            </div>
        </div>
    )
}

export default Tasks