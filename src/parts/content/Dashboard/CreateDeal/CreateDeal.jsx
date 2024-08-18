import { useState, useEffect } from "react"
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import nextId from "react-id-generator";
import notification from "../../../Functions/notification";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const CreateDeal = (props) => {

    let Stages = props.stages

    Stages.forEach(el => {
        if(!el.deals){
            el.deals = []
        }
    });

    const [dealName, setDealName] = useState(null)
    const [dealPrice, setDealPrice] = useState(null)
    const [dealStage, setDealStage] = useState(Stages.length ? Stages[0].id : null)

    function dealNameChange(ev) {
        setDealName(ev.target.value);
    }
    function dealPriceChange(ev) {
        setDealPrice(ev.target.value);
    }
    function dealStageChange(ev) {
        setDealStage(ev.target.value);
    }

    function postDeal(e) {
        e.preventDefault();

        //Create deal
        const database = firebase.database();
        const ref = database.ref('/funnels');
        const d = props.data
        d.forEach(el => {
            if(el.funnelID === localStorage.getItem('selectedOption')){
                el.funnel.forEach(element => {
                    if(element.id === dealStage){
                        element.deals.push({
                            id: uuidv4(),
                            name: dealName,
                            price: dealPrice
                        })
                        element.dealsSum =  Number(element.dealsSum) + Number(dealPrice)
                    }
                });
            }
        });
        ref.set(d)
        notification("Сделка создана", props.users)
        toast.success('Сделка создана')
    }
    return(
        <div className="createDeal">
            <form onSubmit={postDeal} class="modal-content">
                <div>
                    <label for="title">Название сделки</label>
                    <input id="title" value={dealName} name="title" type="text" onChange={(e) => dealNameChange(e)} />
                </div>
                <div>
                    <label for="price">Цена сделки</label>
                    <input id="price" value={dealPrice} name="price" type="number" onChange={(e) => dealPriceChange(e)} />
                </div>
                <div>
                    <label for="stage">Этап сделки</label>
                    <select id="stage" name="stage" onChange={(e) => dealStageChange(e)}>
                        {Stages.map(stage => <option value={stage.id}>{stage.name}</option>)}
                    </select>
                </div>
                <button type='submit' class="details-modal-title">Создать сделку</button>
            </form>
        </div>
    )
}

export default CreateDeal