import { useSelector } from 'react-redux';
import { numberWithCommas } from '../helpers';

function CarValue() {
  const totalCost = useSelector(({ cars: { data, searchTerm } }) =>
    data
    .filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reduce((acc, car) => acc + car.cost, 0)
  );

  return <div className="car-value">Total Cost: ${numberWithCommas(totalCost)}</div>;
}

export default CarValue;
