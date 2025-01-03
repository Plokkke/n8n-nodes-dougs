import { ExecuteHandler, linkResOp } from '../../../../utils';
import { resource } from '../index';
import { propertyByName } from '../../../properties';
import { IExecuteFunctions, INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';

import { getProperty as getCompanyIdProperty } from '../../../properties/companyId';
import { getProperty as getOperationIdProperty } from '../../../properties/operationId';

export const operation: INodePropertyOptions & { value: string } = {
	name: 'Validate',
	value: 'validate',
	action: `Validate`,
};

export const handler: ExecuteHandler = async (ctxt: IExecuteFunctions) => {
	const credentials = (await ctxt.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const items = ctxt.getInputData();
	const returnData = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const operation = await dougsApi.validateOperation(
				getCompanyIdProperty(ctxt, i),
				getOperationIdProperty(ctxt, i),
			);
			returnData.push(operation);
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
