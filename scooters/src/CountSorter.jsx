
function CountSorter({ sort, sortFree, sortBusy, scootersCount, scootersCountRide, scootersCountUssageFree, scootersCountUssageBusy  }) {
  return (
    <>
      <div className="sort-conteiner">
        <h4>Rušiuoti pagal: </h4>
        <button className="btn-sort" type="button" onClick={() => sort('last_use_time')}>Paskutinį naudojimą</button>
        <button className="btn-sort" type="button" onClick={() => sort('total_ride_kilometres')}>Pagal nuvažiuotą atstumą</button>
        <button className="btn-sort" type="button" onClick={() => sortFree()}>Pagal laivus paspirtukus</button>
        <button className="btn-sort" type="button" onClick={() => sortBusy()}>Pagal užimtus paspirtukus</button>
      </div>
      <div className="statistics-conteiner">
        <h5>Statistika</h5>
        <h6>Viso paspirtukų: {scootersCount} </h6>
        <h6>Laisvi paspirtukai: {scootersCountUssageFree}</h6>
        <h6>Užimti paspirtukai: {scootersCountUssageBusy}</h6>
        <h6>Bendras nuvažiuotas atstumas: {scootersCountRide} km</h6>
      </div>
    </>
  );
}

export default CountSorter;