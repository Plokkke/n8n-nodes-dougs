import { ExecuteHandler, linkResOp } from '../../../../utils';
import { resource } from '../index';
import { propertyByName } from '../../../properties';
import { IExecuteFunctions, INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';

import { getProperty as getCompanyIdProperty } from '../../../properties/companyId';
import { getProperty as getOperationProperty } from '../../../properties/operationId';

export const operation: INodePropertyOptions & { value: string } = {
	name: 'Delete',
	value: 'delete',
	action: `Delete`,
};

export const handler: ExecuteHandler = async (ctxt: IExecuteFunctions) => {
	const credentials = (await ctxt.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const items = ctxt.getInputData();
	const returnData = [];

	for (let i = 0; i < items.length; i++) {
		try {
			await dougsApi.deleteOperation(getCompanyIdProperty(ctxt, i), getOperationProperty(ctxt, i));
			returnData.push({ success: true });
		} catch (e) {
			returnData.push(e);
		}
	}

	return [ctxt.helpers.returnJsonArray(returnData)];
};

export function setup(): void {
	// Required properties
	linkResOp(propertyByName.companyId, resource.value, operation.value);
	linkResOp(propertyByName.operationId, resource.value, operation.value);
}
