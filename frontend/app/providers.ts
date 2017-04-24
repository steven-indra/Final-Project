import { OpaqueToken } from '@angular/core';

export const lookupListToken = new OpaqueToken('lookupListToken');

export const lookupLists = {
    genders: [{ value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }]
};