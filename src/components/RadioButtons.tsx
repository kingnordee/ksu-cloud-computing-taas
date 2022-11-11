import React, {FC, useState} from "react";

export interface IRadioButtonsInfo {
    name: string,
    value: string,
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
                        return  <p key={idx}>
                            <input
                                type="radio"
                                name={btn.name}
                                value={btn.value}
                                id={btn.id}
                                onChange={radioHandler}
                                checked={btn.value == selection}
                            />
                            <label htmlFor={btn.id}>{btn.name}</label>
                        </p>
                    })
                }
        </div>
    );
};

export default RadioButtons
