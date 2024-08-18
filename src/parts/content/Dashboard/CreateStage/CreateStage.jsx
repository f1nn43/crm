import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import nextId from "react-id-generator";
import notification from "../../../Functions/notification";
import './CreateStage.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const CreateStage = (props) => {
    const [stageName, setStageName] = useState(null)

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function stageNameChange(ev) {
        setStageName(ev.target.value);
    }

    function postStage(e){
        e.preventDefault();

        //Create stage
        const database = firebase.database();
        const ref = database.ref('/funnels');
        const d = props.data
        d.forEach(el => {
            console.log(props.funnelID)
            if(el.funnelID === localStorage.getItem('selectedOption')){
                el.funnel.push({
                    id: uuidv4(),
                    name: stageName,
                    deals: [],
                    dealsSum: 0,
                    color: getRandomColor()
                })
            }
        });
        ref.set(d)

        notification("Этап создан", props.users)
        toast.success('Этап создан')
      }
    return(
        <div className='createStage'>
            <form class="modal-content" id="nameForm" onSubmit={postStage}>
                <div>
                    <label for="title">Название этапа</label>
                    <input id="title" value={stageName} name="title" type="text" onChange={(e) => stageNameChange(e)} />
                </div>
                <button type='submit' class="details-modal-title">Создать Этап</button>
            </form>
        </div>
    )
}

export default CreateStage