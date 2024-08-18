import { TabView, TabPanel } from 'primereact/tabview';
import SettProfile from './SettProfile/SettProfile';
import styles from './Settings.module.css'
import SettFunnels from './SettFunnels/SettFunnels';
import SettSchems from './SettSchems/SettSchems';
import SettCompany from "./SettCompany/SettCompany";
import SettUsers from "./SettUsers/SettUsers";

const Settings = (props) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper__inner}>
                <TabView style={{height: "100%"}}>
                    <TabPanel header="Профиль">
                        <SettProfile users={props.users} user={props.user}/>
                    </TabPanel>
                    <TabPanel header="Воронки">
                        <SettFunnels users={props.users} user={props.user} data={props.data} />
                    </TabPanel>
                    <TabPanel header="Схемы">
                        <SettSchems users={props.users} user={props.user} data={props.data}/>
                    </TabPanel>
                    <TabPanel header="Пользователи">
                        <SettUsers users={props.users} user={props.user} data={props.data}/>
                    </TabPanel>
                    <TabPanel header="Компании">
                        <SettCompany/>
                    </TabPanel>
                    <TabPanel header="Whatsapp">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </TabPanel>
                    <TabPanel header="Telegram">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}

export default Settings