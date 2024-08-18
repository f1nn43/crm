import styles from './SettFunnel.module.css'
import { Button } from 'primereact/button';
import firebase from 'firebase/compat/app';
import { toast } from 'react-toastify';

const SettFunnel = (props) => {
    const deleteFunnel = () => {
        const database = firebase.database();
        const ref = database.ref('/funnels');
        
        let updatedData = [];
        props.data.forEach(funnel => {
            if(!(funnel.funnelID === props.funnel.funnelID)){
                updatedData.push(funnel)
            }
        });
        ref.set(updatedData)
        toast.success('Воронка успешно удалена')
    }
    return(
        <div className={styles.funnel}>
            <h4>{props.funnel.funnelName}</h4>
            <Button icon="pi pi-times" onClick={deleteFunnel} rounded outlined severity="danger" aria-label="Cancel" />
        </div>
    )
}

export default SettFunnel