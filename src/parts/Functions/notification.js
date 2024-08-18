import firebase from 'firebase/compat/app';
const notification = (text, users) => {
    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    const updatedUsers = users
    updatedUsers.forEach(us => {
        if(us.uid === localStorage.getItem('uid')){
            us.notifications.unshift({notificationText: text, time: getCurrentTime(), date: getCurrentDate()})
        }      
    });
    firebase.database().ref('/users').set(updatedUsers);
}

export default notification