class DoctorDTO {
    #drFirstName
    #drSurname
    #drCode
    #prescriberCode
    #drAddress
    #drPhoneNo
    #drEmail
    #drClinic
    #drQualif
    #drGender
    #drLanguages

    constructor(obj = {}) {
        this.#drFirstName = obj.drFirstName;
        this.#drSurname = obj.drSurname;
        this.#drCode = obj.drCode;
        this.#prescriberCode = obj.prescriberCode;
        this.#drAddress = obj.drAddress;
        this.#drPhoneNo = obj.drPhoneNo;
        this.#drEmail = obj.drEmail;
        this.#drClinic = obj.drClinic;
        this.#drQualif = obj.drQualif;
        this.#drGender = obj.drGender;
        this.#drLanguages = obj.drLanguages;
    }

    get getDrFirstName() {
        return this.#drFirstName;
    }

    set setDrFirstName(value) {
        this.#drFirstName = value;
    }

    get getDrSurname() {
        return this.#drSurname;
    }

    set setDrSurname(value) {
        this.#drSurname = value
    }

    get getDrCode() {
        return this.#drCode;
    }

    set setDrCode(value) {
        this.#drCode = value
    }

    get getDrPresciberCode() {
        return this.#prescriberCode;
    }

    set setDrPrescriberCode(value) {
        this.#prescriberCode = value
    }

    get getDrAddress() {
        return this.#drAddress;
    }

    set setDrAddress(value) {
        this.#drAddress = value;
    }

    get getDrPhoneNo() {
        return this.#drPhoneNo;
    }

    set setDrPhoneNo(value) {
        this.#drPhoneNo = value
    }

    get getDrEmail() {
        return this.#drEmail;
    }

    set setDrEmail(value) {
        this.#drEmail = value
    }

    get getDrClinic() {
        return this.#drClinic;
    }

    set setDrClinic(value) {
        this.#drClinic = value;
    }

    get getDrQualif() {
        return this.#drQualif;
    }

    set setDrQualif(value) {
        this.#drQualif = value;
    }

    get getDrGender() {
        return this.#drGender;
    }

    set setDrGender(value) {
        this.#drGender = value;
    }

    get getDrLanguages() {
        return this.#drLanguages;
    }

    set setDrLanguages(value) {
        this.#drLanguages = value;
    }
}

export default DoctorDTO
