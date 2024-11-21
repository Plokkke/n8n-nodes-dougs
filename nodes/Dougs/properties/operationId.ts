import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Category ID',
	name: 'categoryId',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
};

export function getProperty(ctxt: ILoadOptionsFunctions): number;
export function getProperty(ctxt: IExecuteFunctions, idx: number): number;
export function getProperty(ctxt: IExecuteFunctions | ILoadOptionsFunctions, idx?: number): number {
	return parseInt(getValue<string>(ctxt as IExecuteFunctions, property.name, idx!), 10);
}
