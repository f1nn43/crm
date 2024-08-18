import { NavLink } from "react-router-dom"
import styles from './Dealinfo.module.css'
import { useEffect } from "react";

const Dealinfo = (props) => {
    return(
        <div className={styles.card}>
            <form className={styles.card__inner}>
                <div className={styles.card__blocks}>
                    <div className={styles.card__block}>
                        <div className={styles.card__blockinner}>
                            <h5 className={styles.card__blocktitle}>О сделке</h5>
                            <label htmlFor="dealname" className={styles.card__blockdeallabel}>Название сделки</label>
                            <input name="dealname" className={styles.card__blockdealnameinput} value={props.deal.name} />
                            <label htmlFor="dealprice" className={styles.card__blockdeallabel}>Цена сделки</label>
                            <input name="dealprice" className={styles.card__blockdealpriceinput} value={props.deal.price} />
                            <label htmlFor="stage" className={styles.card__blockdeallabel}>Этап сделки</label>
                            <p className={styles.card__blockdealinfo}>{props.stage.name}</p>
                            <label htmlFor="date" className={styles.card__blockdeallabel}>Дата создания сделки</label>
                            <p className={styles.card__blockdealinfo}>12.04.2005</p>
                            <label htmlFor="contact" className={styles.card__blockdeallabel}>Контакт</label>
                        </div>
                    </div>
                    <div className={styles.card__block}>
                        <div className={styles.card__blockinner}>
                            <h5 className={styles.card__blocktitle}>Дополнительно</h5>
                            <label htmlFor="dealbrkp" className={styles.card__blockdeallabel}>БРКП</label>
                        </div>
                    </div>
                </div>
                <div className={styles.card__blocks}>

                </div>
                <NavLink to={`/dashboard/${localStorage.getItem('selectedOption')}`} className={styles.card__btn}>Вернуться назад</NavLink>
            </form>
        </div>
    )
}

export default Dealinfo