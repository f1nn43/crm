import React from "react";
import "./ControlButtons.css";
 
export default function ControlButtons(props) {
    const StartButton = (
        <div className="btn btn-one btn-start"
            onClick={props.handleStart}>
            Начать новый рабочий день
        </div>
    );
    const ActiveButtons = (
        <div className="btn-grp">
            <div className="btn btn-two"
                onClick={props.handleReset}>
                Завершить рабочий день
            </div>
        </div>
    );
 
    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}