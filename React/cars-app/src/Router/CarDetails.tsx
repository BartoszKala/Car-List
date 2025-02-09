import { useEffect, useState } from "react";
import { Car } from "../Models/Car";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getBodyTypeName, getFuelTypeName } from "../Functions/EnumConverter";
import "../styles/CarDetails.css";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarById = async () => {
      const token = localStorage.getItem("token"); // Pobranie tokena

      if (!token) {
        setError("You need to log in to view car details.");
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
        setError("Error fetching car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/edit/${id}`); // Przekierowanie do edycji samochodu
  };

  if (loading) return <div className="car-details">Loading...</div>;
  if (error) return <div className="car-details">Error: {error}</div>;

  return (
    <div className="car-details">
      {car ? (
        <>
          <div className="car-card">
            <h2>{car.brand} {car.model}</h2>
            <p><strong>Number of Doors:</strong> {car.doorsNumber}</p>
            <p><strong>Luggage Capacity:</strong> {car.luggageCapacity} liters</p>
            <p><strong>Engine Capacity:</strong> {car.engineCapacity} cc</p>
            <p><strong>Fuel Type:</strong> {getFuelTypeName(car.fuelType)}</p>
            <p><strong>Production Date:</strong> {new Date(car.productionDate).toLocaleDateString()}</p>
            <p><strong>Fuel Consumption:</strong> {car.carFuelConsumption} L/100km</p>
            <p><strong>Body Type:</strong> {getBodyTypeName(car.bodyType)}</p>
          </div>
          <button className="edit-btn" onClick={handleEditClick}>Edit Car</button>
        </>
      ) : (
        <p>No car details available</p>
      )}
    </div>
  );
}
