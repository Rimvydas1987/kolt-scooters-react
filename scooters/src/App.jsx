import { useEffect, useState } from "react";
import './App.css';
import Registration from './Registration';
import Scooter from "./Scooter";
import axios from 'axios';
import CountSorter from "./CountSorter";

function App() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());//skaičiuoja pasikeitusius irašus, kad padarytu postu update.
  const [scooters, setScooters] = useState([]);
  const [scootersCount, setScootersCount] = useState(0);
  const [scootersCountRide, setScootersCountRide] = useState(0);
  const [scootersCountUssageFree, setScootersCountUssageFree] = useState(0);
  const [scootersCountUssageBusy, setScootersCountUssageBusy] = useState(0);


  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
      .then((response) => {
        setScooters(response.data);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/count')
      .then((response) => {
        setScootersCount(response.data[0].scootersCount);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/countRide')
      .then((response) => {
        setScootersCountRide(response.data[0].scootersCountRide);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/countUssageFree')
      .then((response) => {
        setScootersCountUssageFree(response.data[0].scootersCountUssageFree);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/countUssageBusy')
      .then((response) => {
        setScootersCountUssageBusy(response.data[0].scootersCountUssageBusy);
      })
  }, [lastUpdate])

  const addScooter = (scooter) => {
    axios.post('http://localhost:3003/scooters', scooter)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const deleteScooter = (id) => {
    axios.delete('http://localhost:3003/scooters/' + id)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const editScooter = (id, scooter) => {
    axios.put('http://localhost:3003/scooters/' + id, scooter)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const sort = by => {
    const scootersCopy = scooters.slice();
    if ('last_use_time' === by) {
      scootersCopy.sort((a, b) => {
        if (a.last_use_time > b.last_use_time) {
          return 1;
        }
        if (a.last_use_time < b.last_use_time) {
          return -1;
        }
        return 0;
      });
    }
    if ('total_ride_kilometres' === by) {
      scootersCopy.sort((a, b) => a.total_ride_kilometres - b.total_ride_kilometres);
    }
    setScooters(scootersCopy);
  }

  const sortFree = () => {
    const scootersCopy = scooters.slice();
    scootersCopy.sort((a, b) => {
        if (a.is_busy > b.is_busy) {
          return 1
        }
        if (a.is_busy < b.is_busy) {
          return -1
        }
          return 0
      })
    
    setScooters(scootersCopy);
  }

  const sortBusy = () => {
    const scootersCopy = scooters.slice();
    scootersCopy.sort((a, b) => {
        if (a.is_busy < b.is_busy) {
          return 1
        }
        if (a.is_busy > b.is_busy) {
          return -1
        }
          return 0
      })
    
    setScooters(scootersCopy);
  }

  return (
    <>
      <h1>Kolt paspirtukų nuoma </h1>
      <div className="reg-container">
        <h3>Naujas paspirtukas:</h3>
        <Registration addScooter={addScooter}></Registration>
        <CountSorter sort={sort} sortFree={sortFree} sortBusy={sortBusy} scootersCount={scootersCount} scootersCountRide={scootersCountRide} scootersCountUssageFree={scootersCountUssageFree} scootersCountUssageBusy={scootersCountUssageBusy}></CountSorter>
      </div>
      <table>
        <tbody>
          <tr className="t-header">
            <td>registracijos kodas</td>
            <td>Paskutinio naudojimo data</td>
            <td>rida</td>
            <td>Užimtumas</td>
            <td></td>
            <td></td>
          </tr>
          {scooters.map(scooter => <Scooter key={scooter.id} id={scooter.id} scooter={scooter} deleteScooter={deleteScooter} editScooter={editScooter} />)}
        </tbody>
      </table>
    </>
  );
}

export default App;
