import styles from './Revenue.module.css'

const Revenue = (props) => {
    return(
        <div className={styles.wrapper}>
            {props.users.map(us => <span>{us.name + " - " + us.isAuth}</span>)}
        </div>
    );
}

export default Revenue