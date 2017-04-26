import { OpaqueToken } from '@angular/core';

export const lookupListToken = new OpaqueToken('lookupListToken');

export const lookupLists = {
    genders: [{ value: 'Male', viewValue: 'Male' },{ value: 'Female', viewValue: 'Female' }],
    maritalsStatus: [{ value: 'Single', viewValue: 'Single' },{ value: 'Married', viewValue: 'Married' }],
    status: [{ value: 'Contract', viewValue: 'Contract' },{ value: 'Full Time', viewValue: 'Full Time' }],
    grades: [{ value: 'SE - JP', viewValue: 'SE - JP' },{ value: 'SE - PG', viewValue: 'SE - PG' },{ value: 'SE - AP', viewValue: 'SE - AP' },{ value: 'SE - AN', viewValue: 'SE - AN' }],
    divisions: [{ value: 'CDC AsteRx', viewValue: 'CDC AsteRx' },{ value: 'SWD Red', viewValue: 'SWD Red' },{ value: 'SWD Green', viewValue: 'SWD Green' }],
};
