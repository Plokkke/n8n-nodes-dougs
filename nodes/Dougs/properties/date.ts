import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';
import { DateTime } from 'luxon';

export const property: INodeProperties & Displayable = {
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	default: '',
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
}

export function getProperty(ctxt: ILoadOptionsFunctions): DateTime<true>;
export function getProperty(ctxt: IExecuteFunctions, idx: number): DateTime<true>;
export function getProperty(ctxt: IExecuteFunctions | ILoadOptionsFunctions, idx?: number): DateTime<true> {
	const date = DateTime.fromISO(getValue(ctxt as IExecuteFunctions, property.name, idx!));
	if (!date.isValid) {
		throw new Error('Invalid date');
	}
	return date;
}
