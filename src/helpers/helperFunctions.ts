import * as _ from 'lodash';

const fieldNames = {
    'machines': {
        'customFieldName': 'Machines',
        'name': 'Machine Name'
    },
    'name': 'Tab Name',
    'schema_name': 'Schema Name',
};

export const parseResponseErrors = (responseObj: any) => {
    const errors: string[] = [];
    _.each(responseObj.response.data, (errorElement: any, key: string) => {
        let errorString = '';
        if (typeof errorElement === 'string') {
            errors.push(errorElement);
        } else  {
            errorElement.forEach((error: any) => {
                if (typeof error === 'object') {
                    const errorObjectsArray: string[] = [];
                    _.each(error, (errorObjArray: any, errorObjKey: string) => {
                        // @ts-ignore
                        errorObjectsArray.push(`\n   ${fieldNames[key] && (fieldNames[key][errorObjKey] || errorObjKey)}: ${errorObjArray}`);
                    });
                    errorString += `${errorObjectsArray.join('\n')}`;
                } else {
                    errorString += `${error}`;
                }
            });
            // @ts-ignore
            errors.push(`${fieldNames[key] && (fieldNames[key].customFieldName || fieldNames[key] || key)}: ${errorString}\n`);
        }
    });

    return errors.join('\n');
};

export const hasEditPermissions = (currentUser: any, locationId: number) => {
    return currentUser.is_accounts_management || ['Engineer', 'Manager'].indexOf(currentUser.locations_roles[locationId]) !== -1;
};