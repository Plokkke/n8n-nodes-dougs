import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Binary Field Name',
	name: 'binaryFieldName',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
};

export function getProperty(ctxt: ILoadOptionsFunctions): string;
export function getProperty(ctxt: IExecuteFunctions, idx: number): string;
export function getProperty(ctxt: IExecuteFunctions | ILoadOptionsFunctions, idx?: number): string {
	return getValue<string>(ctxt as IExecuteFunctions, property.name, idx!);
}
