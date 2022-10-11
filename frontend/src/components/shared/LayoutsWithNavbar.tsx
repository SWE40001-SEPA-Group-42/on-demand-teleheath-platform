import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const LayoutsWithNavbar = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default LayoutsWithNavbar;
