import styles from './Login.module.css'
const Login = (props) => {
    return(
        <div className={styles.wrapper}>
            <form onSubmit={props.handleSubmit} className={styles.form}>
                <h2 className={styles.head}>Login CRM</h2>
                <div className={styles.input__box}>
                    <input className={styles.input} type="text" id="name" value={props.name} onChange={(e) => props.setName(e.target.value)} required placeholder='Username' />
                    <i className={"bx bxs-user " + styles.ic}></i>
                </div>
                <div className={styles.input__box}>
                    <input className={styles.input} type="password" id="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} required placeholder='Password' />
                    <i className={"bx bxs-lock-alt " + styles.ic}></i>
                </div>
                <button type="submit" className={styles.button}>Login</button>
                <p className={styles.text}>В случае если у Вас нет аккаунта просим обратиться к директору компании</p>
            </form>
        </div>
    )
}

export default Login