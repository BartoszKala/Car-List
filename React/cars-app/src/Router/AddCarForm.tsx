// import React, { useState } from 'react';
// import { Car, FuelType, BodyType } from '../Models/Car';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AddCarForm() {

//   const [car, setCar] = useState<Car>({
//     id: '', 
//     brand: '',
//     model: '',
//     doorsNumber: 2,
//     luggageCapacity: 1,
//     engineCapacity: 1,
//     fuelType: FuelType.Petrol, // Domyślna wartość
//     productionDate: '',
//     carFuelConsumption: 1,
//     bodyType: BodyType.Hatchback, // Domyślna wartość
//   });
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     const numericValue = Number(value);
  
//     if (name === 'brand') {
//       setCar({ ...car, brand: value });
//     } else if (name === 'model') {
//       setCar({ ...car, model: value });
//     } else if (name === 'doorsNumber') {
//       // Ograniczenie liczby drzwi od 2 do 10
//       if (numericValue >= 2 && numericValue <= 10) {
//         setCar({ ...car, doorsNumber: numericValue });
//       }
//     } else if (name === 'luggageCapacity') {
//       // Minimalna wartość 1, bez maksymalnego ograniczenia
//       if (numericValue >= 1) {
//         setCar({ ...car, luggageCapacity: numericValue });
//       }
//     } else if (name === 'engineCapacity') {
//       // Minimalna wartość 1, bez maksymalnego ograniczenia
//       if (numericValue >= 1) {
//         setCar({ ...car, engineCapacity: numericValue });
//       }
//     } else if (name === 'fuelType') {
//       setCar({ ...car, fuelType: numericValue });
//     } else if (name === 'productionDate') {
//       setCar({ ...car, productionDate: value });
//     } else if (name === 'carFuelConsumption') {
//       // Minimalna wartość 1, bez maksymalnego ograniczenia
//       if (numericValue >= 1) {
//         setCar({ ...car, carFuelConsumption: numericValue });
//       }
//     } else if (name === 'bodyType') {
//       setCar({ ...car, bodyType: numericValue });
//     }
//   };
  
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setError(null);
  
//     try {
//       // Usuń `id` z obiektu samochodu
//       const { id, ...carWithoutId } = car;
  
//       // Wywołanie API z obiektem bez `id`
//       await axios.post('https://localhost:7072/api/Cars', carWithoutId);
  
//       // Zamiast alert, użyj window.confirm dla potwierdzenia, co pozwala lepiej zsynchronizować kod
//       if (window.confirm('Car added successfully. Go to car list?')) {
//         navigate('/cars'); // Przekierowanie do listy samochodów
//       }
//     } catch (err) {
//       setError('Error saving car data');
//     } finally {
//       setSaving(false);
//     }
//   };
  
  
//   return (
//     <div className="car-details">
//       <div className="car-card">
//         <h2>Add New Car</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="error">{error}</div>}
//           <div className="form-group">
//             <label>Brand:</label>
//             <input
//               className="form-input"
//               type="text"
//               name="brand"
//               value={car.brand}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Model:</label>
//             <input
//               className="form-input"
//               type="text"
//               name="model"
//               value={car.model}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Doors Number:</label>
//             <input
//               className="form-input"
//               type="number"
//               name="doorsNumber"
//               value={car.doorsNumber}
//               onChange={handleChange}
//               onInput={(e) => {
//                 if (e.currentTarget.value.startsWith('0')) {
//                   e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
//                 }
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === ',' || e.key === '.' || e.key === 'e') {
//                   e.preventDefault(); // Blokuje wpisanie przecinka, kropki i `e`
//                 }
//               }}
//             />
//           </div>


//           <div className="form-group">
//             <label>Luggage Capacity (liters):</label>
//             <input
//               className="form-input"
//               type="number"
//               name="luggageCapacity"
//               value={car.luggageCapacity}
//               onChange={handleChange}
//               onInput={(e) => {
//                 if (e.currentTarget.value.startsWith('0')) {
//                   e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
//                 }
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label>Engine Capacity (cc):</label>
//             <input
//               className="form-input"
//               type="number"
//               name="engineCapacity"
//               value={car.engineCapacity}
//               onChange={handleChange}
//               onInput={(e) => {
//                 if (e.currentTarget.value.startsWith('0')) {
//                   e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
//                 }
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label>Fuel Type:</label>
//             <select
//               className="form-input"
//               name="fuelType"
//               value={car.fuelType}
//               onChange={handleChange}
//             >
//             <option value={FuelType.Petrol}>Petrol</option>
//             <option value={FuelType.Hybrid}>Hybrid</option>
//             <option value={FuelType.Diesel}>Diesel</option>
//             <option value={FuelType.LPG}>LPG</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Production Date:</label>
//             <input
//               className="form-input"
//               type="date"
//               name="productionDate"
//               value={car.productionDate}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Fuel Consumption (L/100km):</label>
//             <input
//               className="form-input"
//               type="number"
//               name="carFuelConsumption"
//               value={car.carFuelConsumption}
//               onChange={handleChange}
//               onInput={(e) => {
//                 if (e.currentTarget.value.startsWith('0')) {
//                   e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
//                 }
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <label>Body Type:</label>
//             <select
//               className="form-input"
//               name="bodyType"
//               value={car.bodyType} 
//               onChange={handleChange}
//             >
//               <option value={BodyType.Hatchback}>Hatchback</option>
//               <option value={BodyType.Kombi}>Kombi</option>
//               <option value={BodyType.Roadster}>Roadster</option>
//               <option value={BodyType.SUV}>SUV</option>
//               <option value={BodyType.Sedan}>Sedan</option>
//             </select>
//           </div>

//           <button className="submit-btn" type="submit" disabled={saving}>
//             {saving ? 'Saving...' : 'Save'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Car, FuelType, BodyType } from '../Models/Car';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCarForm() {
  const [car, setCar] = useState<Car>({
    id: '', 
    brand: '',
    model: '',
    doorsNumber: 2,
    luggageCapacity: 1,
    engineCapacity: 1,
    fuelType: FuelType.Petrol, // Domyślna wartość
    productionDate: '',
    carFuelConsumption: 1,
    bodyType: BodyType.Hatchback, // Domyślna wartość
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    if (name === 'brand') {
      setCar({ ...car, brand: value });
    } else if (name === 'model') {
      setCar({ ...car, model: value });
    } else if (name === 'doorsNumber') {
      if (numericValue >= 2 && numericValue <= 10) {
        setCar({ ...car, doorsNumber: numericValue });
      }
    } else if (name === 'luggageCapacity') {
      if (numericValue >= 1) {
        setCar({ ...car, luggageCapacity: numericValue });
      }
    } else if (name === 'engineCapacity') {
      if (numericValue >= 1) {
        setCar({ ...car, engineCapacity: numericValue });
      }
    } else if (name === 'fuelType') {
      setCar({ ...car, fuelType: numericValue });
    } else if (name === 'productionDate') {
      setCar({ ...car, productionDate: value });
    } else if (name === 'carFuelConsumption') {
      if (numericValue >= 1) {
        setCar({ ...car, carFuelConsumption: numericValue });
      }
    } else if (name === 'bodyType') {
      setCar({ ...car, bodyType: numericValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { id, ...carWithoutId } = car;

      // Pobranie tokenu z localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a car.');
        setSaving(false);
        return;
      }

      // Wywołanie API z tokenem w nagłówku
      await axios.post('https://localhost:7072/api/Cars', carWithoutId, {
        headers: {
          Authorization: `Bearer ${token}`,  // Dodanie tokenu do nagłówków
        },
      });

      if (window.confirm('Car added successfully. Go to car list?')) {
        navigate('/cars');
      }
    } catch (err) {
      setError('Error saving car data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="car-details">
      <div className="car-card">
        <h2>Add New Car</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label>Brand:</label>
            <input
              className="form-input"
              type="text"
              name="brand"
              value={car.brand}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Model:</label>
            <input
              className="form-input"
              type="text"
              name="model"
              value={car.model}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Doors Number:</label>
            <input
              className="form-input"
              type="number"
              name="doorsNumber"
              value={car.doorsNumber}
              onChange={handleChange}
              onInput={(e) => {
                if (e.currentTarget.value.startsWith('0')) {
                  e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === ',' || e.key === '.' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="form-group">
            <label>Luggage Capacity (liters):</label>
            <input
              className="form-input"
              type="number"
              name="luggageCapacity"
              value={car.luggageCapacity}
              onChange={handleChange}
              onInput={(e) => {
                if (e.currentTarget.value.startsWith('0')) {
                  e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
                }
              }}
            />
          </div>

          <div className="form-group">
            <label>Engine Capacity (cc):</label>
            <input
              className="form-input"
              type="number"
              name="engineCapacity"
              value={car.engineCapacity}
              onChange={handleChange}
              onInput={(e) => {
                if (e.currentTarget.value.startsWith('0')) {
                  e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
                }
              }}
            />
          </div>

          <div className="form-group">
            <label>Fuel Type:</label>
            <select
              className="form-input"
              name="fuelType"
              value={car.fuelType}
              onChange={handleChange}
            >
              <option value={FuelType.Petrol}>Petrol</option>
              <option value={FuelType.Hybrid}>Hybrid</option>
              <option value={FuelType.Diesel}>Diesel</option>
              <option value={FuelType.LPG}>LPG</option>
            </select>
          </div>

          <div className="form-group">
            <label>Production Date:</label>
            <input
              className="form-input"
              type="date"
              name="productionDate"
              value={car.productionDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fuel Consumption (L/100km):</label>
            <input
              className="form-input"
              type="number"
              name="carFuelConsumption"
              value={car.carFuelConsumption}
              onChange={handleChange}
              onInput={(e) => {
                if (e.currentTarget.value.startsWith('0')) {
                  e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '');
                }
              }}
            />
          </div>

          <div className="form-group">
            <label>Body Type:</label>
            <select
              className="form-input"
              name="bodyType"
              value={car.bodyType}
              onChange={handleChange}
            >
              <option value={BodyType.Hatchback}>Hatchback</option>
              <option value={BodyType.Kombi}>Kombi</option>
              <option value={BodyType.Roadster}>Roadster</option>
              <option value={BodyType.SUV}>SUV</option>
              <option value={BodyType.Sedan}>Sedan</option>
            </select>
          </div>

          <button className="submit-btn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}
