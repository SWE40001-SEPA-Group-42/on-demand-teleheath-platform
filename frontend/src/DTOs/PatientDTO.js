import DTO from './DTO';
import AddressDTO from './AddressDTO';

class PatientDTO extends DTO {
	#ptJoinedAt;
	#ptGivenName;
	#ptSurname;
	#ptPreferredName;
	#ptDOB;
	#ptBirthSex;
	#ptEmail;
	#ptMobile;
	#ptAddress;

	constructor(obj = {}) {
		super(obj);
		this.#ptJoinedAt = obj.ptJoinedAt;
		this.#ptGivenName = obj.ptGivenName;
		this.#ptSurname = obj.ptSurname;
		this.#ptPreferredName = obj.ptPreferredName;
		this.#ptDOB = obj.ptDOB;
		this.#ptBirthSex = obj.ptBirthSex;
		this.#ptEmail = obj.ptEmail;
		this.#ptMobile = obj.ptMobile;
		this.#ptAddress = new AddressDTO(obj.ptAddress);
	}
  
	get ptJoinedAt() {
		return this.#ptJoinedAt;
	}
	set ptJoinedAt(value) {
		this.#ptJoinedAt = value;
	}
	get ptJoinedAtDate() {
		return new Date(this.ptJoinedAt);
	}
	set ptJoinedAtDate(value) {
		this.#ptJoinedAt = value.toISOString();
	}
	get ptGivenName() {
		return this.#ptGivenName;
	}
	set ptGivenName(value) {
		this.#ptGivenName = value;
	}
	get ptSurname() {
		return this.#ptSurname;
	}
	set ptSurname(value) {
		this.#ptSurname = value;
	}
	get ptPreferredName() {
		return this.#ptPreferredName;
	}
	set ptPreferredName(value) {
		this.#ptPreferredName = value;
	}
	get ptDOB() {
		return this.#ptDOB;
	}
	set ptDOB(value) {
		this.#ptDOB = value;
	}
	get ptBirthSex() {
		return this.#ptBirthSex;
	}
	set ptBirthSex(value) {
		this.ptBirthSex = value;
	}
	get ptEmail() {
		return this.#ptEmail;
	}
	set ptEmail(value) {
		this.#ptEmail = value;
	}
	get ptMobile() {
		return this.#ptMobile;
	}
	set ptMobile(value) {
		this.#ptMobile = value;
	}
	get ptAddress() {
		return this.#ptAddress;
	}
	set ptAddress(value) {
		this.#ptAddress = value;
	}

	toJSON() {
		return {
			_id: this._id,
			ptJoinedAt: this.ptJoinedAt,
			ptGivenName: this.ptGivenName,
			ptSurname: this.ptSurname,
			ptPreferredName: this.ptPreferredName,
			ptDOB: this.ptDOB,
			ptBirthSex: this.ptBirthSex,
			ptEmail: this.ptEmail,
			ptMobile: this.ptMobile,
			ptAddress: this.Address.toFilteredJSON(),
		};
	}
}

Window.PatientDTO = PatientDTO; // TODO: Remove this... debug only

export default PatientDTO;
