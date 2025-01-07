import { ILoadOptionsFunctions, INodeProperties } from 'n8n-workflow';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'VAT Exemption',
	name: 'vatExemption',
	type: 'options',
	default: 'false',
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
	options: [{
		value: 'false',
		name: 'No VAT Exemption',
	}, {
		value: 'true',
		name: 'Simple VAT Exemption',
	}, {
		value: 'exemption:outbound:outsideEuropeanUnion',
		name: 'Outside EU Purchase',
	} ]
};

export function getProperty(ctxt: ILoadOptionsFunctions): boolean | 'exemption:outbound:outsideEuropeanUnion';
export function getProperty(ctxt: IExecuteFunctions, idx: number): boolean | 'exemption:outbound:outsideEuropeanUnion';
export function getProperty(
	ctxt: IExecuteFunctions | ILoadOptionsFunctions,
	idx?: number,
): boolean | 'exemption:outbound:outsideEuropeanUnion' {
	const value = getValue<string>(ctxt as IExecuteFunctions, property.name, idx!);

	if (value === 'false') return false;
	if (value === 'true') return true;
	return 'exemption:outbound:outsideEuropeanUnion';
}
