import { ExecuteHandler, linkResOp } from '../../../../utils';
import { resource } from '../index';
import { propertyByName } from '../../../properties';
import { IExecuteFunctions, INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';

import { getProperty as getCompanyIdProperty } from '../../../properties/companyId';
import { getProperty as getDateProperty } from '../../../properties/date';
import { getProperty as getMemoProperty } from '../../../properties/memo';
import { getProperty as getDistanceProperty } from '../../../properties/distance';
import { getProperty as getCarIdProperty } from '../../../properties/carId';

export const operation: INodePropertyOptions & { value: string } = {
	name: 'Create',
	value: 'create',
	action: `Create`,
};

export const handler: ExecuteHandler = async (ctxt: IExecuteFunctions) => {
	const credentials = (await ctxt.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const items = ctxt.getInputData();
	const returnData = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const allowance = await dougsApi.registerMileageAllowance(getCompanyIdProperty(ctxt, i), {
				date: getDateProperty(ctxt, i),
				memo: getMemoProperty(ctxt, i),
				distance: getDistanceProperty(ctxt, i),
				carId: getCarIdProperty(ctxt, i),
			});
			returnData.push(allowance);
		} catch (e) {
			returnData.push(e);
		}
	}

	return [ctxt.helpers.returnJsonArray(returnData)];
};

export function setup(): void {
	// Required properties
	linkResOp(propertyByName.companyId, resource.value, operation.value);
	linkResOp(propertyByName.date, resource.value, operation.value);
	linkResOp(propertyByName.memo, resource.value, operation.value);
	linkResOp(propertyByName.distance, resource.value, operation.value);

	// TODO
	// Additional properties
	linkResOp(propertyByName.carId, resource.value, operation.value);
}
