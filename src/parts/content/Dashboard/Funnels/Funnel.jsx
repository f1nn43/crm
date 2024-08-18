import styles from './Funnels.module.css'
import { useState, useEffect } from 'react'
import Deal from './Deal/Deal'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';


const Funnel = (props) => {
    const Stages = props.stages

    const [stages, setStages] = useState(Stages)
    const [currentStage, setCurrentStage] = useState(null)
    const [currentDeal, setCurrentDeal] = useState(null)

    useEffect(() => {
        setStages(Stages);
    }, [props.data]);


    
    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, stage, deal) {
        setCurrentStage(stage)
        setCurrentDeal(deal)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e) {
        e.preventDefault()
        e.target.style.boxShadow = 'none'
    }

    function dropDealHandler(e, stage) {
        const St = props.stages
        const St2 = props.stages
        let Stage = stage;
        St.forEach(stg => {
            if(stg.id === stage.id){
                St2.forEach(stg2 => {
                    if(stg.edgeWith === stg2.id){
                        if(stg2.options.isMoving){
                            setCurrentStage(stg)
                            Stage = stg2
                        }
                    }
                })
            }
        })
        Stage.deals.push(currentDeal);
        currentStage.dealsSum = Number(currentStage.dealsSum) - Number(currentDeal.price);
        Stage.dealsSum = Number(Stage.dealsSum) + Number(currentDeal.price);
        const currentIndex = currentStage.deals.indexOf(currentDeal);
        currentStage.deals.splice(currentIndex, 1);
        const updatedStages = stages.map((b) => {
            if (b.id === Stage.id) {
                return Stage;
            }
            if (b.id === currentStage.id) {
                return currentStage;
            }
            return b;
        });
        const d = props.data
        d.forEach(el => {
            if(el.funnelID === props.funnelID){
                el.funnel = updatedStages
            }
        })
        postData(d)
    }

    function postData(data) {
        const database = firebase.database();
        const ref = database.ref('/funnels');
        ref.set(data);
    }

    return(
        <div className={styles.dashboard__stages}>
            {stages.map(stage => <div className={styles.dashboard__stage}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropDealHandler(e, stage)}
            >
                <div className={styles.dashboard__stageInner} style={{ 'border-bottom': `3px solid ${stage.color}` }}>
                    <h5 className={styles.dashboard__stageHead}>{stage.name}</h5>
                    <div>
                        <p className={styles.dashboard__stageDeals}><span>{stage.deals.length}</span> сделок</p>
                        <p className={styles.dashboard__stagePrice}><span id="price">{stage.dealsSum}</span></p>
                    </div>
                </div>
                {stage.deals.map(deal => <div className={styles.deal_drug} onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, stage, deal)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => { dropHandler(e); }}
                    draggable={true}><Deal className={styles.deal}
                    deal={deal}/></div>
                )}
            </div>
            )}
        </div>
    )
}

export default Funnel