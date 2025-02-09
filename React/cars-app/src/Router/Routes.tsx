// import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import CarList from "./CarList";
// import CarDetails from "./CarDetails";
// import CarForm from "./CarForm";
// import NotFound from "../Functions/NotFound";
// import AddCarForm from "./AddCarForm";
// import Login from "./Login";
// import Register from "./Register";
// import Menu from "./Menu";


// export const routes: RouteObject[] = [
//     {
//         path: "/",
//         element: <Menu />,
//         children: [
//             {path: 'cars', element: <CarList />},
//             // :id jest tzw 'root parameter', który należy odebrać w <CarDetails />
//             // używamy do tego useParams
//             {path: 'cars/:id', element: <CarDetails />},
//             {path: 'edit/:id', element: <CarForm />},
//             {path: 'not-found', element: <NotFound />},
//             {path: "add", element: <AddCarForm/>},
//             {path: 'account/login', element:<Login/>},
//             {path: 'account/register', element: <Register/>},
//             {path: "menu", element: <Menu/>},
//             //{path: 'delete/:id', element: <CarDelete /> }, 
//             // za każdym razem jak będzie niepoprawny adres url odeśle nas do <NotFound />
//             {path: '*', element: <Navigate replace to='/not-found' />}
//         ]
//     }
// ]

// export const router = createBrowserRouter(routes);


import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import CarForm from "./CarForm";
import NotFound from "../Functions/NotFound";
import AddCarForm from "./AddCarForm";
import Login from "./Login";
import Register from "./Register";
import Menu from "./Menu";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />, // Zmieniono na Menu, aby to było pierwszym widokiem
        children: [
            { path: 'cars', element: <CarList /> },
            { path: 'cars/:id', element: <CarDetails /> },
            { path: 'edit/:id', element: <CarForm /> },
            { path: 'not-found', element: <NotFound /> },
            { path: "add", element: <AddCarForm /> },
            { path: 'account/login', element: <Login /> },
            { path: 'account/register', element: <Register /> },
            { path: '', element: <Menu /> },
            { path: '*', element: <Navigate replace to='/not-found' /> } // Przekierowanie na stronę not-found w razie nieznanej ścieżki
        ]
    },
    {
        path: '*',
        element: <Navigate replace to="/not-found" />, // Globalne przekierowanie na stronę not-found, jeśli ścieżka jest błędna
    }
]

export const router = createBrowserRouter(routes);
