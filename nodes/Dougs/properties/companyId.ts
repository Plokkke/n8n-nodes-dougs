import { ILoadOptionsFunctions, INodeListSearchResult, INodeProperties } from 'n8n-workflow';

import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Company',
	name: 'companyId',
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
				searchListMethod: 'getCompanies',
				searchable: false,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			placeholder: 'company id',
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
		getCompanies,
	},
};

async function getCompanies(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	const credentials = (await this.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const user = await dougsApi.getMe();

	return {
		results: user.companies.map((company: { id: number; brandName: string }) => ({
			name: company.brandName,
			value: `${company.id}`,
		})),
	};
}
