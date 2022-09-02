import DAO from './DAO';
import DoctorDTO from '../DTOs/DoctorDTO';

const DoctorDAO = new DAO('doctor', DoctorDTO);

Window.DoctorDAO = DoctorDAO; // TODO: Remove this... debug only

export default DoctorDAO;