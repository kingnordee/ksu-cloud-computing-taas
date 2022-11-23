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
    const [selection, setSelection] = useState<String>("transit");

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(event.target.value);
        handler(event.target.value);
    };

    return (
        <div className="radioButtons">
                {
                    info.map((btn, idx) => {
                        const lName = <span>{btn.name}<br/></span>
                        const lDistance = btn.name && <span>{btn.distance}<br/></span>
                        const lDuration = btn.duration && <span>{btn.duration}<br/></span>
                        const lCost = btn.duration && <span>{btn.cost}<br/></span>
                        const labels = <span>{lName}{lDistance}{lDuration}{lCost}</span>
                        return  <div key={idx}>
                            <p className='mainP' key={idx}>
                                <input
                                    type="radio"
                                    name={btn.name}
                                    value={btn.value}
                                    id={btn.id}
                                    onChange={radioHandler}
                                    checked={btn.value == selection}
                                />
                                <span><label htmlFor={btn.id}>{labels}</label></span>
                            </p>
                        </div>
                    })
                }
        </div>
    );
};

export default RadioButtons
