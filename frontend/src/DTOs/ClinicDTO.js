import DTO from './DTO';
import AddressDTO from './AddressDTO';

class ClinicDTO extends DTO {
	#clCreatedAt;
	#clName;
	#clEmail;
	#clPhone;
	#clAddress;

	constructor(obj = {}) {
		super(obj);
		this.#clName = obj.clName;
		this.#clEmail = obj.clEmail;
		this.#clPhone = obj.clPhone;
		this.#clAddress = new AddressDTO(obj.clAddress);
	}
  
	get clCreatedAt() {
		return this.#clCreatedAt;
	}
	set clCreatedAt(value) {
		this.#clCreatedAt = value;
	}
	get clCreatedAtDate() {
		return new Date(this.clCreatedAt);
	}
	set clCreatedAtDate(value) {
		this.#clCreatedAt = value.toISOString();
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

	toJSON() {
		return {
			_id: this._id,
			clCreatedAt: this.clCreatedAt,
			clName: this.clName,
			clEmail: this.clEmail,
			clPhone: this.clPhone,
			clAddress: this.clAddress.toFilteredJSON(),
		};
	}
}

Window.ClinicDTO = ClinicDTO; // TODO: Remove this... debug only

export default ClinicDTO;
