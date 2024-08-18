import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from './content/Dashboard/Dashboard';
import Revenue from './content/Revenue/Revenue';
import Main from './content/Main/Main'
import Notifications from './content/Notifications/Notifications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './content/Loading/Loading';
import Files from './content/Files/Files'
import avatar from "../images/profile.jpeg";
import StopWatch from './Functions/Timer/StopWatch';
import Chat from './content/Chat/Chat'
import Tasks from './content/Tasks/Tasks';
import Settings from './content/Settings/Settings';

const Navbar = ({ rerender, data, users, handleLogout}) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState()

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/');
    };

    if (users == null || data == null) {
        return(
            <Loading />
        )
    } else {
        const User = users.find(el => el.uid === localStorage.getItem('uid'))
        return (
            <div className='navnavbar'>
                <div class="sidebar">
                    <ul>
                        <NavLink className='navlink logo' to="/">
                            <a href="#">
                                <span class='icon'><i class='bx bx-shield'></i></span>
                                <span class="text">Моя оборона</span>
                            </a>
                        </NavLink>
                        <NavLink to={`/dashboard/${selectedOption || localStorage.getItem('selectedOption')}`} className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-customize'></i></span>
                                <span class="text">Рабочий стол</span>
                            </a>
                        </NavLink>
                        <NavLink to="/revenue" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bxl-graphql'></i></span>
                                <span class="text">Статистика</span>
                            </a>
                        </NavLink>
                        <NavLink to="/notifications" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-bell'></i></span>
                                <span class="text">Уведомления</span>
                            </a>
                        </NavLink>
                        <NavLink to={`/chat/${localStorage.getItem('chat')}`} className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-chat'></i></span>
                                <span class="text">Чат</span>
                            </a>
                        </NavLink>
                        <NavLink to="/files" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-file-blank'></i></span>
                                <span class="text">Файлы</span>
                            </a>
                        </NavLink>
                        <NavLink to="/tasks" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-task'></i></span>
                                <span class="text">Задачи</span>
                            </a>
                        </NavLink>
                        <div className='bottom'>
                            <li className="navlink watch">
                                <StopWatch rerender={rerender} users={users} user={User}/>
                            </li>
                            <NavLink to='/settings' className="navlink">
                                <a href="#">
                                    <span class='icon'><i class='bx bx-cog'></i></span>
                                    <span class="text">Настройки</span>
                                </a>
                            </NavLink>
                            <div className='profilelog'>
                                <li className="navlink">
                                    <a>
                                        <span class='icon'>
                                            <div className="imgBx">
                                                <img src={User.avatar}/>
                                            </div>
                                        </span>
                                        <span class="text">{User.name}</span>
                                    </a>
                                </li>
                                <button className="navlink" onClick={handleLogoutClick}>
                                    <a>
                                        <span class='icon'><i class='bx bx-log-out'></i></span>
                                        <span class="text">Выйти</span>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>
                <section className="wrapper">
                    <div className="wrapper__inner">
                        <Routes>
                            <Route path='/' element={<Main state={rerender} data={data} users={users} user={User} />} />
                            <Route path={`/dashboard/*`} element={<Dashboard rerender={rerender} data={data} users={users} user={User} setSelectedOption={setSelectedOption}/>} />
                            <Route path='/revenue' element={<Revenue users={users}/>} />
                            <Route path='/notifications' element={<Notifications rerender={rerender} data={data} users={users} user={User} />} />
                            <Route path='/chat/*' element={<Chat user={User}/>}/>
                            <Route path='/files' element={<Files />} />
                            <Route path='/tasks' element={<Tasks user={User} users={users}/>} />
                            <Route path='/settings' element={<Settings user={User} users={users} data={data}/>} /> 
                        </Routes>
                        <ToastContainer className={styles.toast} />
                    </div>
                </section>
            </div>
    );
    }
}

export default Navbar