import DTO from './DTO';
import AddressDTO from './AddressDTO';

class DoctorDTO extends DTO {
	#drCreatedAt;
	#drGivenName;
	#drSurname;
	#drPreferredName;
	#drDOB;
	#drBirthSex;
	#drEmail;
	#drMobile;
	#drAddress;
    #drCode;
	#drPrescribeCode;
	#drClinicName;
	#drQualifications;
	#drLanguages;

	constructor(obj = {}) {
		super(obj);
		this.#drCreatedAt = obj.drCreatedAt;
		this.#drGivenName = obj.drGivenName;
		this.#drSurname = obj.drSurname;
		this.#drPreferredName = obj.drPreferredName;
		this.#drDOB = obj.drDOB;
		this.#drBirthSex = obj.drBirthSex;
		this.#drEmail = obj.drEmail;
		this.#drMobile = obj.drMobile;
		this.#drAddress = new AddressDTO(obj.drAddress);
        this.#drCode = obj.drCode;
        this.#drPrescribeCode = obj.drPrescribeCode;
        this.#drClinicName = obj.drClinicName;
        this.#drQualifications = obj.drQualifications;
        this.#drLanguages = obj.drLanguages;
	}

	get drCreatedAt() {
		return this.#drCreatedAt;
	}
	set drCreatedAt(value) {
		this.#drCreatedAt = value;
	}
	get drCreatedAtDate() {
		return new Date(this.drCreatedAt);
	}
	set drCreatedAtDate(value) {
		this.#drCreatedAt = value.toISOString();
	}
	get drGivenName() {
		return this.#drGivenName;
	}
	set drGivenName(value) {
		this.#drGivenName = value;
	}
	get drSurname() {
		return this.#drSurname;
	}
	set drSurname(value) {
		this.#drSurname = value;
	}
	get drPreferredName() {
		return this.#drPreferredName;
	}
	set drPreferredName(value) {
		this.#drPreferredName = value;
	}
	get drDOB() {
		return this.#drDOB;
	}
	set drDOB(value) {
		this.#drDOB = value;
	}
	get drBirthSex() {
		return this.#drBirthSex;
	}
	set drBirthSex(value) {
		this.#drBirthSex = value;
	}
	get drEmail() {
		return this.#drEmail;
	}
	set drEmail(value) {
		this.#drEmail = value;
	}
	get drMobile() {
		return this.#drMobile;
	}
	set drMobile(value) {
		this.#drMobile = value;
	}
	get drAddress() {
		return this.#drAddress;
	}
	set drAddress(value) {
		this.#drAddress = value;
	}
    get drCode() {
        return this.#drCode;
    }
    set drCode(value) {
        this.#drCode = value;
    }
    get drPrescribeCode() {
        return this.#drPrescribeCode;
    }
    set drPrescribeCode(value) {
        this.#drPrescribeCode = value;
    }
    get drClinicName() {
        return this.#drClinicName;
    }
    set drClinicName(value) {
        this.#drClinicName = value;
    }
    get drQualifications() {
        return this.#drQualifications;
    }
    set drQualifications(value) {
        this.#drQualifications = value;
    }
    get drLanguages() {
        return this.#drLanguages;
    }
    set drLanguages(value) {
        this.#drLanguages = value;
    }

	toJSON() {
		return {
			_id: this._id,
			drJoinedAt: this.drJoinedAt,
			drGivenName: this.drGivenName,
			drSurname: this.drSurname,
			drPreferredName: this.drPreferredName,
			drDOB: this.drDOB,
			drBirthSex: this.drBirthSex,
			drEmail: this.drEmail,
			drMobile: this.drMobile,
			drAddress: this.drAddress.toFilteredJSON(),
            drCode: this.drCode,
            drPrescribeCode: this.drPrescribeCode,
            drClinicName: this.drClinicName,
            drQualifications: this.drQualifications,
            drLanguages: this.drLanguages,
		};
	}
}

export default DoctorDTO;
