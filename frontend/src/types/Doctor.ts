export type Doctor = {
	userId?: string,
	_id?: string;
	drGivenName: string;
	drSurname: string;
	drPreferredName: string;
	drDOB: string;
	drBirthSex: string;
	drEmail: string;
	drPhone: string;
	drAddress: {
		line1: string;
		line2: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
	drCode: string;
	drPrescriberNo: string;
	drQualifications: string;
	drLanguagesSpoken: string;
	drClinicName: string;
};
