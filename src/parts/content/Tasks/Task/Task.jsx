import styles from './Task.module.css'
import firebase from 'firebase/compat/app';
import { Button } from 'primereact/button';

const Task = (props) => {

    return(
        <div className={styles.task}>
            <h4>{props.task.desc}</h4>
        </div>
    )
}

export default Task