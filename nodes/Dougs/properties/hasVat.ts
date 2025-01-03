import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Has VAT',
	name: 'hasVat',
	type: 'boolean',
	default: true,
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
};

export function getProperty(ctxt: ILoadOptionsFunctions): boolean;
export function getProperty(ctxt: IExecuteFunctions, idx: number): boolean;
export function getProperty(
	ctxt: IExecuteFunctions | ILoadOptionsFunctions,
	idx?: number,
): boolean {
	return getValue<boolean>(ctxt as IExecuteFunctions, property.name, idx!);
}
