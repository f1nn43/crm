import styles from './SettUser.module.css'
const SettUser = (props) => {
    return(
        <div className={styles.funnel}>
            <h4>{props.user.avatar ? <img src={props.user.avatar} width={40}/> : 'Нет аватара' } <br/>{props.user.name} <br/> Логин: {props.user.nickname}</h4><span>{props.user.isAuth ? 'В сети' : 'Не в сети'}</span></div>
    )
}

export default SettUser