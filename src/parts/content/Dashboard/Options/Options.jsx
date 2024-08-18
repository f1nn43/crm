import React, { useState, useEffect } from 'react';
import styles from './Options.module.css';
import CreateStage from '../CreateStage/CreateStage';
import CreateDeal from '../CreateDeal/CreateDeal';
import Select from 'react-select';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

const Options = (props) => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('selectedOption') || props.data[0].funnelID
  );
  const [visibleRight, setVisibleRight] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    const selectedValue = event.value;
    setSelectedOption(selectedValue);
    props.handleOptionChange(selectedValue);
  };

  return (
    <div className={styles.dashboard__options}>
      <Sidebar className={styles.sidebar} visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        <h2>Функции рабочего стола</h2>
        <div className={styles.sidebar__content}>
          <h3>Создать этап</h3>
          <CreateStage rerender={props.rerender} users={props.users} user={props.user} data={props.data} funnelID={props.funnelID} />
          {props.stages.length ? (
            <div>
              <h3>Создать сделку</h3>
              <CreateDeal stages={props.stages} users={props.users} rerender={props.rerender} data={props.data} />
            </div>
          ) : ""}
          <h3>Воронки</h3>
          <div className={styles.selectOption}>
            <Select
              defaultValue={props.data.map(funnel => ({
                value: funnel.funnelID,
                label: funnel.funnelName
              })).find(f => f.value === localStorage.getItem('selectedOption'))}
              options={props.data.map(funnel => ({
                value: funnel.funnelID,
                label: funnel.funnelName
              }))}
              onChange={handleOptionChange}
            />
          </div>
        </div>
      </Sidebar>
      <Button className={styles.sideBarBtn} icon="pi pi-arrow-right" onClick={() => setVisibleRight(true)} />
    </div>
  );
};

export default Options;
