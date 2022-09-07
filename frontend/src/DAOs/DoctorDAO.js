import DAO from './DAO';
import DoctorDTO from '../DTOs/DoctorDTO';

const DoctorDAO = new DAO('doctor', DoctorDTO);

export default DoctorDAO;