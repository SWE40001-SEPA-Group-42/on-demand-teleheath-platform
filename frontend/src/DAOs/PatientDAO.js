import DAO from './DAO';
import PatientDTO from '../DTOs/PatientDTO';

const PatientDAO = new DAO('patient', PatientDTO);

Window.CustomerDAO = PatientDAO; // TODO: Remove this... debug only

export default PatientDAO;