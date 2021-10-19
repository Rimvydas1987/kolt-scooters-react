import { useState, useEffect } from "react";

function Scooter({ id, scooter, deleteScooter, editScooter }) {
    const [editDate, setEditDate] = useState('');
    const [editMilage, setEditMilage] = useState(0);
    const [editBusy, setEditBusy] = useState(false);


    //perkeičia database reiksme i checkbox reiksme (true/false).
    useEffect(() => {
        if (scooter.is_busy === 0) {
            setEditBusy(true)
        } else {
            setEditBusy(false)
        }
    }, [scooter.is_busy])

    useEffect(() => {
        setEditBusy(scooter.is_busy);
    }, [scooter.is_busy])


    //Pakeičia datos formatą i normalų
    function dateConverter(a) {
        let date = new Date(a);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return year + '-' + month + '-' + dt;
    }

    const editDateInputHandler = (e) => {
        setEditDate(e.target.value)
    }
    const editMilageInputHandler = (e) => {
        setEditMilage(e.target.value)
    }
    const editBusyInputHandler = () => {
        setEditBusy(!editBusy)
    }

    const edit = () => {
        if (editDate === "") {
            return (alert('Prašome užpildytis laukelį: "PASKUTINIO NAUDOJIMO DATA"!'));
        } else if(editMilage < 0){
            return(alert('Prašome, kad laukelis "RIDA" nebūtų neigiamas skaičius'));
        } else if(editMilage > 99999.99){
            return(alert('Prašome, kad laukelis "RIDA" neviršytų 9999.99 km!'))
        }else{
            const sumKm = parseFloat(scooter.total_ride_kilometres) + parseFloat(editMilage); //sumuoja kilometrus su duombazes ir pridetus.
            editScooter(id, {
                registration_code: scooter.registration_code,
                is_busy: editBusy,
                last_use_time: editDate,
                total_ride_kilometres: sumKm,
            });
        }
        setEditMilage(0);
    }


    let scooterUsage = "";
    if (scooter.is_busy === 1) {
        scooterUsage = "Užimtas";
    } else {
        scooterUsage = "Laisvas";
    }

    return (
        <tr>
            <td>{scooter.registration_code}</td>
            <td>{dateConverter(scooter.last_use_time)}
                <input type="date" onChange={editDateInputHandler} value={editDate} />
            </td>
            <td>{scooter.total_ride_kilometres} km
                <input type="number" onChange={editMilageInputHandler} value={editMilage} />
            </td>
            <td className="">{scooterUsage}
                <input type="checkbox" checked={editBusy} onChange={editBusyInputHandler} value={editBusy} />
            </td>
            <td>
                <button className="btn-edit" onClick={edit}>redaguoti</button>
            </td>
            <td>
                <button className="btn-delete" onClick={() => deleteScooter(scooter.id)}>trinti</button>
            </td>
        </tr>

    )
}

export default Scooter;