import { ExecuteHandler, linkResOp } from '../../../../utils';
import { resource } from '../index';
import { propertyByName } from '../../../properties';
import { IExecuteFunctions, INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';

import { getProperty as getAmountProperty } from '../../../properties/amount';
import { getProperty as getCategoryIdProperty } from '../../../properties/categoryId';
import { getProperty as getCompanyIdProperty } from '../../../properties/companyId';
import { getProperty as getDateProperty } from '../../../properties/date';
import { getProperty as getHasVatProperty } from '../../../properties/hasVat';
import { getProperty as getMemoProperty } from '../../../properties/memo';
import { getProperty as getPartnerIdProperty } from '../../../properties/partnerId';

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
			const expense = await dougsApi.registerExpense(getCompanyIdProperty(ctxt, i), {
				date: getDateProperty(ctxt, i),
				memo: getMemoProperty(ctxt, i),
				amount: getAmountProperty(ctxt, i),
				categoryId: getCategoryIdProperty(ctxt, i),
				partnerId: getPartnerIdProperty(ctxt, i),
				hasVat: getHasVatProperty(ctxt, i),
			});
			returnData.push(expense);
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
	linkResOp(propertyByName.amount, resource.value, operation.value);
	linkResOp(propertyByName.categoryId, resource.value, operation.value);
	linkResOp(propertyByName.partnerId, resource.value, operation.value);

	// TODO
	// Additional properties
	linkResOp(propertyByName.hasVat, resource.value, operation.value);
}
