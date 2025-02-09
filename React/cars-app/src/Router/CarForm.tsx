import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Car, FuelType, BodyType } from '../Models/Car';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CarForm() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarById = async () => {
      const token = localStorage.getItem('token'); // Pobranie tokena z localStorage

      if (!token) {
        setError('User is not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7072/api/Cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówków
          },
        });
        setCar(response.data);
      } catch (err) {
        setError('Error fetching car data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (car) {
      const { name, value } = e.target;
  
      if (name === 'brand') {
        setCar({ ...car, brand: value });
      } else if (name === 'model') {
        setCar({ ...car, model: value });
      } else if (name === 'doorsNumber') {
        const numericValue = Math.max(2, Math.min(Number(value), 10)); // Minimalnie 2, maksymalnie 10 drzwi
        setCar({ ...car, doorsNumber: numericValue });
      } else if (name === 'luggageCapacity') {
        const numericValue = Math.max(1, Number(value)); // Minimalnie 0
        setCar({ ...car, luggageCapacity: numericValue });
      } else if (name === 'engineCapacity') {
        const numericValue = Math.max(1, Number(value)); // Minimalnie 0
        setCar({ ...car, engineCapacity: numericValue });
      } else if (name === 'fuelType') {
        setCar({ ...car, fuelType: Number(value) });
      } else if (name === 'productionDate') {
        setCar({ ...car, productionDate: value });
      } else if (name === 'carFuelConsumption') {
        const numericValue = Math.max(1, Number(value)); // Minimalnie 0
        setCar({ ...car, carFuelConsumption: numericValue });
      } else if (name === 'bodyType') {
        setCar({ ...car, bodyType: Number(value) });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (car) {
      setSaving(true);
      const token = localStorage.getItem('token'); // Pobranie tokena z localStorage

      if (!token) {
        setError('User is not authenticated. Please log in.');
        setSaving(false);
        return;
      }

      try {
        await axios.put(`https://localhost:7072/api/Cars/${id}`, car, {
          headers: {
            Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówków
          },
        });
        alert('Car updated successfully');
        navigate('/cars');
      } catch (err) {
        setError('Error saving car data. Please try again later.');
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <div className="car-details">
      <div className="car-card">
        <h2>Car Details</h2>
        <form onSubmit={handleSubmit}>
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
              value={car.productionDate.slice(0, 10)}
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
  ) : (
    <div>No car data available</div>
  );
}
