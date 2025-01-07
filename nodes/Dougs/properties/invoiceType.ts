import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Invoice Type',
	name: 'invoiceType',
	type: 'options',
	default: 'incoming',
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
	options: [{
		value: 'incoming',
		name: 'Incoming Invoice',
	}, {
		value: 'outgoing',
		name: 'Outgoing Invoice',
	} ]
};

export function getProperty(ctxt: ILoadOptionsFunctions): 'incoming' | 'outgoing';
export function getProperty(ctxt: IExecuteFunctions, idx: number): 'incoming' | 'outgoing';
export function getProperty(
	ctxt: IExecuteFunctions | ILoadOptionsFunctions,
	idx?: number,
): 'incoming' | 'outgoing' {
	return getValue<string>(ctxt as IExecuteFunctions, property.name, idx!) as 'incoming' | 'outgoing';
}
