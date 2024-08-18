import styles from'./Loading.module.css'
const Loading = () => {
    return(
        <div className={styles.loader}>
            <div className={styles.loader_inner}>CRM</div>
        </div>
    )
}

export default Loading