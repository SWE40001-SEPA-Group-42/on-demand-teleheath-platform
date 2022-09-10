import DAO from './DAO';
import ClinicDTO from '../DTOs/ClinicDTO';

const ClinicDAO = new DAO('clinic', ClinicDTO);

Window.ClinicDAO = ClinicDAO; // TODO: Remove this... debug only

export default ClinicDAO;