import { INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';

import { handlerByOperation, operationsOptions, setups } from './operations';
import { INodeProperties } from 'n8n-workflow';

export const resource: INodePropertyOptions & { value: string } = {
	value: 'invoice',
	name: 'Invoice',
	description: 'Invoice resource',
};

export const operationsProperty: INodeProperties = {
	displayName: 'Invoice',
	name: 'invoice',
	type: 'options',
	default: '',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [resource.value],
		},
	},
	options: operationsOptions,
};

export { handlerByOperation, setups };
