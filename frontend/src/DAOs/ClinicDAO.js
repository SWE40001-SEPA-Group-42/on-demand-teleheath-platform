import DAO from './DAO'
import ClinicDTO from '../DTOs/ClinicDTO'

const ClinicDAO = new DAO('patient', ClinicDTO)

Window.ClinicDAO = ClinicDAO

export default ClinicDAO
