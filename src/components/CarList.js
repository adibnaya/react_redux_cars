import { useDispatch, useSelector } from 'react-redux';
import { removeCar } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { numberWithCommas } from '../helpers';

function CarList() {
  const dispatch = useDispatch();

  const selectNameAndCars = createSelector(
    (state) => state.form.name,
    (state) => state.cars.data,
    (state) => state.cars.searchTerm,
    // Output selector: use the values from the input selectors to compute the derived data
    (name, cars, searchTerm) => ({
      name,
      cars: cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })
  );

  const { name, cars } = useSelector(selectNameAndCars);

  const handleDelete = (id) => {
    dispatch(removeCar(id));
  }

  const renderedCars = cars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${numberWithCommas(car.cost)}
        </p>
        <button className="button is-danger" onClick={() => {handleDelete(car.id)}}>
          Delete
        </button>
      </div>
    );
  })
  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
