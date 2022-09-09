import DAO from './DAO';
import SampleDTO from './../DTOs/SampleDTO'

const SampleDAO = new DAO('sample', SampleDTO);

Window.SampleDAO = SampleDAO; // TODO: Remove this... debug only

export default SampleDAO;