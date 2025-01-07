import { ExecuteHandler, linkResOp } from '../../../../utils';
import { resource } from '../index';
import { propertyByName } from '../../../properties';
import { IExecuteFunctions, INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';

import { getProperty as getCompanyIdProperty } from '../../../properties/companyId';
import { getProperty as getFileNameProperty } from '../../../properties/fileName';
import { getProperty as getBinaryFileKey } from '../../../properties/binaryFieldName';
import { getProperty as getInvoiceTypeProperty } from '../../../properties/invoiceType';

export const operation: INodePropertyOptions & { value: string } = {
	name: 'Upload',
	value: 'upload',
	action: `Upload`,
};

export const handler: ExecuteHandler = async (ctxt: IExecuteFunctions) => {
	const credentials = (await ctxt.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const items = ctxt.getInputData();
	const returnData = [];

	for (let i = 0; i < items.length; i++) {
		const type = getInvoiceTypeProperty(ctxt, i);
		if (type === 'outgoing') {
			throw new Error(`Invoice type ${type} is not implemented yet`);
		}
		try {
			const buffer = await ctxt.helpers.getBinaryDataBuffer(i, getBinaryFileKey(ctxt, i));
			// TODO if filename missing take it from binary props ?
			const response = await dougsApi.uploadVendorInvoice(
				getCompanyIdProperty(ctxt, i),
				getFileNameProperty(ctxt, i),
				buffer,
			);
			returnData.push(response);
		} catch (e) {
			returnData.push(e);
		}
	}

	return [ctxt.helpers.returnJsonArray(returnData)];
};

export function setup(): void {
	// Required properties
	linkResOp(propertyByName.companyId, resource.value, operation.value);
	linkResOp(propertyByName.invoiceType, resource.value, operation.value);
	linkResOp(propertyByName.fileName, resource.value, operation.value);
	linkResOp(propertyByName.binaryFieldName, resource.value, operation.value);
}
