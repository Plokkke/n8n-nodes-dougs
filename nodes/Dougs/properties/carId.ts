import { ILoadOptionsFunctions, INodeListSearchResult, INodeProperties } from 'n8n-workflow';
import { DougsApiByLogin, DougsCredentials, Car } from '@plokkke/dougs-compta';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';
import { getProperty as getCompanyIdProperty } from './companyId';

export const property: INodeProperties & Displayable = {
	displayName: 'Car ID',
	name: 'carId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	displayOptions: {
		show: {
			resource: [] as string[],
			operation: [] as string[],
		},
	},
	modes: [
		{
			displayName: 'List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'getCars',
				searchable: false,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			placeholder: 'car id',
		},
	],
};

export function getProperty(ctxt: ILoadOptionsFunctions): number;
export function getProperty(ctxt: IExecuteFunctions, idx: number): number;
export function getProperty(ctxt: IExecuteFunctions | ILoadOptionsFunctions, idx?: number): number {
	return parseInt(getValue<string>(ctxt as IExecuteFunctions, property.name, idx!), 10);
}

export const methods = {
	listSearch: {
		getCars,
	},
};

async function getCars(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	const credentials = (await this.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);
	const companyId = getCompanyIdProperty(this);

	const cars = await dougsApi.getCars(companyId);

	return {
		results: cars.map((car: Car) => ({
			name: car.name,
			value: `${car.id}`,
		})),
	};
}
