
function CountSorter({ sort, scootersCount, scootersCountRide }) {
  return (
    <>
      <div className="sort-conteiner">
        <h4>Sort by</h4>
        <button className="btn-sort" type="button" onClick={() => sort('last_use_time')}>Paskutinį naudojimą</button>
        <button className="btn-sort" type="button" onClick={() => sort('total_ride_kilometres')}>Pagal nuvažiuotą atstumą</button>
      </div>
      <div className="statistics-conteiner">
        <h5>Statistics</h5>
        <h6>Viso paspirtukų: {scootersCount} </h6>
        <h6>Bendras nuvažiuotas atstumas: {scootersCountRide} km</h6>
      </div>
    </>
  );
}

export default CountSorter;