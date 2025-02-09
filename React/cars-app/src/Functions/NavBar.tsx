import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook do sprawdzenia bieżącej lokalizacji

    // Sprawdzamy, czy użytkownik jest na jednej z trzech stron: '/', '/account/login', '/account/register'
    const isHomePage = location.pathname === '/' || location.pathname === '/account/login' || location.pathname === '/account/register';

    return (
        <div
            className="car-list-header clickable-header"
            onClick={() => !isHomePage && navigate('/cars')} // Jeśli nie jesteśmy na stronie głównej, przekierowujemy
            role="button"
            tabIndex={isHomePage ? -1 : 0} // Jeśli jesteśmy na stronie głównej, element nie jest dostępny za pomocą Tab
            onKeyDown={(e) => {
                if (!isHomePage && (e.key === 'Enter' || e.key === ' ')) {
                    navigate('/cars');
                }
            }}
            style={{
                display: isHomePage ? 'none' : 'block', // Całkowite ukrycie przycisku, gdy jesteśmy na stronie głównej
                pointerEvents: isHomePage ? 'none' : 'auto', // Zablokowanie interakcji, jeśli jesteśmy na stronie głównej
                opacity: isHomePage ? 0 : 1, // Całkowite ukrycie przycisku w widoku (opcjonalnie)
            }}
        >
            <div className="header-content">Car List</div>
        </div>
    );
}
