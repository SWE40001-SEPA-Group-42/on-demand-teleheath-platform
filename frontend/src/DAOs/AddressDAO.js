import DAO from './DAO';
import AddressDTO from './../DTOs/AddressDTO'

const AddressDAO = new DAO('address', AddressDTO);

Window.AddressDAO = AddressDAO; // TODO: Remove this... debug only

export default AddressDAO;