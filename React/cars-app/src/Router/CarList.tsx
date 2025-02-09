import { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../Models/Car';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { getBodyTypeName, getFuelTypeName } from '../Functions/EnumConverter';
import "../styles/CarDetails.css";

// export default function CarList() {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       const token = localStorage.getItem('token'); // Pobierz token z localStorage

//       if (!token) {
//         setError('User is not authenticated. Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get<Car[]>('https://localhost:7072/api/cars/', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Dodaj token w nagłówku
//           },
//         });

//         setCars(response.data);
//       } catch (err) {
//         setError('Error fetching cars. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const deleteCar = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Stop event propagation to prevent unexpected behavior

//     const confirmed = window.confirm('Are you sure you want to delete this car?');
//     if (confirmed) {
//       const token = localStorage.getItem('token'); // Pobierz token z localStorage

//       axios
//         .delete(`https://localhost:7072/api/cars/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Dodaj token w nagłówku
//           },
//         })
//         .then(() => {
//           setCars((prevCars) => prevCars.filter((car) => car.id !== id));
//         })
//         .catch((error) => {
//           console.error('Error deleting the car:', error);
//         });
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <div className="car-list">
//         <ul>
//           {cars.map((car) => (
//             <li key={car.id}>
//               <h2>
//                 {car.brand} {car.model}
//               </h2>
//               <p>
//                 <strong>Fuel Type:</strong> {getFuelTypeName(car.fuelType)}
//               </p>
//               <p>
//                 <strong>Production Date:</strong> {new Date(car.productionDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Body Type:</strong> {getBodyTypeName(car.bodyType)}
//               </p>
//               <div className="actions">
//                 <Button as={NavLink} to={`/cars/${car.id}`} className="car-list-button">
//                   Details
//                 </Button>
//                 <Button as={NavLink} to={`/edit/${car.id}`} className="car-list-button">
//                   Edit
//                 </Button>
//                 <Button onClick={(e) => deleteCar(car.id, e)} className="delete-button">
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Button as={NavLink} to={`/add`} className="add-car">
//         Add Car
//       </Button>
//     </>
//   );
// }
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Car } from '../Models/Car';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
// import { getBodyTypeName, getFuelTypeName } from '../Functions/EnumConverter';

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayname] = useState<string | null>(null); // State for storing username
  const navigate = useNavigate();

  // Fetch cars and username from localStorage
  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('displayName');
    console.log('Fetched displayName from localStorage:', storedUsername); // Debugging
    if (storedUsername) {
      setDisplayname(storedUsername);
    }

    // Fetch cars
    const fetchCars = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Car[]>('https://localhost:7072/api/cars/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (err) {
        setError('Error fetching cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Function to delete a car
  const deleteCar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const confirmed = window.confirm('Are you sure you want to delete this car?');
    if (confirmed) {
      const token = localStorage.getItem('token');

      axios
        .delete(`https://localhost:7072/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting the car:', error);
        });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('displayName');
    navigate('/'); // Redirect to homepage after logout
  };

  // Loading, Error Handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* User Info Card */}
      <div className="user-card">
        {displayName ? (
          <p>User: {displayName}</p>
        ) : (
          <p>Loading user info...</p>
        )}

        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      {/* Car List */}
      <div className="car-list">
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <h2>
                {car.brand} {car.model}
              </h2>
              <p>
                <strong>Fuel Type:</strong> {getFuelTypeName(car.fuelType)}
              </p>
              <p>
                <strong>Production Date:</strong> {new Date(car.productionDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Body Type:</strong> {getBodyTypeName(car.bodyType)}
              </p>
              <div className="actions">
                <Button as={NavLink} to={`/cars/${car.id}`} className="car-list-button">
                  Details
                </Button>
                <Button as={NavLink} to={`/edit/${car.id}`} className="car-list-button">
                  Edit
                </Button>
                <Button onClick={(e) => deleteCar(car.id, e)} className="delete-button">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button  className="edit-btn" onClick={()=>navigate(`/add`)}>Add Car</button>


    </>
  );
}

