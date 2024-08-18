import { NavLink } from "react-router-dom";
import styles from "./Deal.module.css"
import { useEffect } from "react";

const Deal = (props) => {
    useEffect(() => {
        document.querySelectorAll('#price').forEach((node) => {
            if (!isNaN(node.textContent)) {
                node.textContent = new Intl.NumberFormat('ru-RU', {
                    currency: 'rub',
                    style: 'currency',
                }).format(node.textContent);
            }
        });
    }, []);

    return(
        <div className={styles.deal}>
            <h2 className={styles.deal__title}>Название сделки: {props.deal.name}</h2>
            <p className={styles.deal__price}>Цена: <span id="price">{props.deal.price}</span></p>
            <div className={styles.deal__info}>
                <p>Описание сделки:</p>
                <p>Дата: 15 июля 2023</p>
                <p>Клиент: Иван Иванов</p>
            </div>
            <NavLink className={styles.deal__button} to={`/dashboard/deals/${props.deal.id}`}>Рассмотреть сделку</NavLink>
        </div>
    )
}

export default Deal