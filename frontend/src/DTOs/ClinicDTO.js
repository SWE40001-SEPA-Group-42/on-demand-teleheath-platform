import DTO from './DTO';
import AddressDTO from './AddressDTO';

class ClinicDTO extends DTO {
	#clUsername
	#clPassword
	#clName
	#clEmail
	#clPhone
	#clAddress
	#clUrl

	constructor(obj = {}) {
		super(obj);
		this.#clUsername = obj.clUsername;
		this.#clName = obj.clName;
		this.#clEmail = obj.clEmail;
		this.#clPhone = obj.clPhone;
		this.#clAddress = new AddressDTO(obj.clAddress)
		this.#clUrl = obj.clURL;
	}
  
	get clUsername() {
		return this.#clUsername;
	}
	set clUsername(value) {
		this.#clUsername = value;
	}
    get clName() {
		return this.#clName;
	}
	set clName(value) {
		this.#clName = value;
	}
    get clEmail() {
		return this.#clEmail;
	}
	set clEmail(value) {
		this.#clEmail = value;
	}
    get clPhone() {
		return this.#clPhone;
	}
	set clPhone(value) {
		this.#clPhone = value;
	}
    get clAddress() {
		return this.#clAddress;
	}
	set clAddress(value) {
		this.#clAddress = value;
	}
    get clURL() {
		return this.#clURL;
	}
	set clURL(value) {
		this.#clURL = value;
	}
	}

	toJSON() {
		return {
			_id: this._id,
            clUsername: this.clUsername,
            clName: this.clName,
            clEmail: this.clEmail,
            clPhone: this.clPhone,
			clAddress: this.clAddress.toFilteredJSON(),
            clURL: this.clURL,
		};
	}
}

Window.ClinicDTL = ClinicDTO;

export default ClinicDTO;
