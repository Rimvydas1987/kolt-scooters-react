import { useState } from "react";

function Registration({ addScooter }) {
    const [regCode, setRegCode] = useState('');
    const [milage, setMilage] = useState('0');
    const [date, setDate] = useState('');

    const control = (e, what) => {
        switch (what) {
            case 'reg':
                setRegCode(e.target.value);
                break;
            case 'mile':
                setMilage(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
        }
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
                    <input type="text" maxLength="8" onChange={(e) => control(e, 'reg')} value={regCode} />
                </div>
                <div>
                    <label>Rida:</label>
                    <input type="number" onChange={(e) => control(e, 'mile')} value={milage} />
                </div>
                <div>
                    <label>Data:</label>
                    <input type="date" onChange={(e) => control(e, 'date')} value={date} />
                </div>
                <button className="btn-add" onClick={insert}>Įvesti naują</button>
            </div>
        </>
    );
}

export default Registration;