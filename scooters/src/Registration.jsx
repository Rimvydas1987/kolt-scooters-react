import { useState } from "react";

function Registration({ addScooter }) {
    const [regCode, setRegCode] = useState('');
    const [milage, setMilage] = useState('0');
    const [date, setDate] = useState('');


    const editRegCodeInputHandler = (e) => {
        setRegCode(e.target.value)
    }
    const editMilageInputHandler = (e) => {
        setMilage(e.target.value)
    }
    const editDateInputHandler = (e) => {
        setDate(e.target.value)
    }



    const insert = () => {
        addScooter({
            registration_code: regCode,
            is_busy: 0,
            last_use_time: date,
            total_ride_kilometres: milage,
        });
        setRegCode('');
        setMilage(0);
    }

    return (
        <>
            <div>
                <div>
                    <label>Registracijos kodas:</label>
                    <input type="text" maxLength="8" onChange={editRegCodeInputHandler} value={regCode} />
                </div>
                <div>
                    <label>Rida:</label>
                    <input type="number" onChange={editMilageInputHandler} value={milage} />
                </div>
                <div>
                    <label>Data:</label>
                    <input type="date" onChange={editDateInputHandler} value={date} />
                </div>
                <button className="btn-add" onClick={insert}>Įvesti naują</button>
            </div>
        </>
    );
}

export default Registration;