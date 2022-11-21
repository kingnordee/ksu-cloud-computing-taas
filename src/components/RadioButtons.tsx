import React, {FC, useState} from "react";

export interface IRadioButtonsInfo {
    name: string,
    value: string,
    distance: string,
    duration: string,
    cost: string,
    id: string
}
export interface IRadioButtons {
    info: IRadioButtonsInfo[],
    handler: (selected: string) => void,
}
const RadioButtons: FC<IRadioButtons> = ({info, handler}) => {
    const [selection, setSelection] = useState<String>("driving");

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(event.target.value);
        handler(event.target.value);
    };

    return (
        <div className="radioButtons">
                {/*<legend>Travel Mode</legend>*/}
                {
                    info.map((btn, idx) => {
                        const lName = <span>{btn.name}<br/></span>
                        const lDistance = btn.name && <span>{btn.distance}<br/></span>
                        const lDuration = btn.duration && <span>{btn.duration}<br/></span>
                        const lCost = btn.duration && <span>{btn.cost}<br/></span>
                        const labels = <span>{lName}{lDistance}{lDuration}{lCost}</span>
                        return  <div>
                            <p className='mainP' key={idx}>
                                <input
                                    type="radio"
                                    name={btn.name}
                                    value={btn.value}
                                    id={btn.id}
                                    onChange={radioHandler}
                                    checked={btn.value == selection}
                                />
                                <p><label htmlFor={btn.id}>{labels}</label></p>
                            </p>
                            {/*<p>{btn.distance}</p>*/}
                            {/*<p>{btn.duration}</p>*/}
                            {/*<p>${btn.cost}</p>*/}
                        </div>
                    })
                }
        </div>
    );
};

export default RadioButtons
