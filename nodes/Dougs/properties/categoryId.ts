import { ILoadOptionsFunctions, INodeListSearchResult, INodeProperties, NodeOperationError } from 'n8n-workflow';
import { Category, DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';
import { Displayable, getValue } from '../../utils';
import { IExecuteFunctions } from 'n8n-workflow/dist/Interfaces';

export const property: INodeProperties & Displayable = {
	displayName: 'Category ID',
	name: 'categoryId',
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
				searchListMethod: 'getCategories',
				searchable: true,
				searchFilterRequired: true,
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			placeholder: 'category id',
		},
	],
};


export const methods = {
	listSearch: {
		getCategories,
	}
};

export function getProperty(ctxt: ILoadOptionsFunctions): number;
export function getProperty(ctxt: IExecuteFunctions, idx: number): number;
export function getProperty(ctxt: IExecuteFunctions | ILoadOptionsFunctions, idx?: number): number {
	return parseInt(getValue<string>(ctxt as IExecuteFunctions, property.name, idx!), 10);
}

async function getCategories(
	this: ILoadOptionsFunctions,
	search?: string,
): Promise<INodeListSearchResult> {
	if (!search) {
		throw new NodeOperationError(this.getNode(), 'Query required for search');
	}
	const parameter = this.getNodeParameter('companyId');
	const companyId =
		parameter && typeof parameter === 'object' && 'value' in parameter
			? (parameter.value as number)
			: 0;

	const credentials = (await this.getCredentials('dougsLoginApi')) as DougsCredentials;
	const dougsApi = new DougsApiByLogin(credentials);

	const categories = await dougsApi.getCategories(companyId, 'expense', search);

	return {
		results: categories.map((category: Category) => ({
			name: category.wording,
			value: `${ category.id }`,
			description: category.description,
		})),
	};
}
