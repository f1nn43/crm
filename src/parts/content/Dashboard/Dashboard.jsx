import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Options from './Options/Options';
import Funnel from './Funnels/Funnel';
import Dealinfo from './Funnels/Deal/Dealinfo/Dealinfo';


const Dashboard = (props) => {
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption'));
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
  const navigate = useNavigate();

  const Funnels = props.data
  if (Funnels.length) {
    const funnel = Funnels.find((Funnel) => Funnel.funnelID === selectedOption);
    let Stages;
    if(funnel){
      Stages = funnel.funnel;
    } else {
      Stages = Funnels[0].funnel
    }

    

    const handleOptionChange = (event) => {
      const selectedValue = event;
      setSelectedOption(selectedValue);
      props.setSelectedOption(selectedValue)
      navigate(`/dashboard/${selectedValue}`); // Перенаправляем на выбранный маршрут
    };
    return (
      <div className={styles.dashboard__wrapper}>
        <Options
          stages={Stages}
          data={props.data}
          rerender={props.rerender}
          user={props.user}
          users={props.users}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <Routes>
          {Funnels.map((el) => (
            <Route key={el.funnelID} path={`/${el.funnelID}`} element={<Funnel key={el.funnelID} stages={el.funnel} data={props.data} funnelID={el.funnelID} rerender={props.rerender} />} />
          ))}
          {Stages.map((stage) => stage.deals.map((deal) => <Route key={deal.id} path={`/deals/${deal.id}`} element={<Dealinfo deal={deal} stage={stage} />} />))}
        </Routes>
      </div>
    )
    
    } else {
      return(
        <h1>Нет данных</h1>
      )
    }
};

export default Dashboard;