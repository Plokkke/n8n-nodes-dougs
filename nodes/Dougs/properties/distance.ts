import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Distance',
	name: 'distance',
	type: 'number',
	default: '',
	placeholder: '28 Km',
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
	return Math.round(getValue<number>(ctxt as IExecuteFunctions, property.name, idx!));
}
