import DTO from './DTO';
import SampleDTO from './SampleDTO';

class AddressDTO extends DTO {
	#line1;
	#line2;
	#city;
	#state;
	#postcode;
	#country;
	#sample;

	constructor(obj = {}) {
		super(obj);
		this.#line1 = obj.line1;
		this.#line2 = obj.line2;
		this.#city = obj.city;
		this.#state = obj.state;
		this.#postcode = obj.postcode;
		this.#country = obj.country;
		this.#sample = new SampleDTO(obj.sample);
	}

	get line1() {
		return this.#line1;
	}
	set line1(value) {
		this.#line1 = value;
	}
	get line2() {
		return this.#line2;
	}
	set line2(value) {
		this.#line2 = value;
	}
	get city() {
		return this.#city;
	}
	set city(value) {
		this.#city = value;
	}
	get state() {
		return this.#state;
	}
	set state(value) {
		this.#state = value;
	}
	get postcode() {
		return this.#postcode;
	}
	set postcode(value) {
		this.#postcode = value;
	}
	get country() {
		return this.#country;
	}
	set country(value) {
		this.#country = value;
	}
	get sample() {
		return this.#sample;
	}
	set sample(value) {
		this.#sample = value;
	}

	toJSON() {
		return {
			_id: this._id,
			line1: this.line1,
			line2: this.line2,
			city: this.city,
			state: this.state,
			postcode: this.postcode,
			country: this.country,
			sample: this.sample,
		};
	}
}

Window.AddressDTO = AddressDTO; // TODO: Remove this... debug only

export default AddressDTO;
