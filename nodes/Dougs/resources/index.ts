import {
	handlerByOperation as expenseHandlerByOperation,
	operationsProperty as expenseOperationsProperty,
	resource as expenseResource,
	setups as expenseSetups,
} from './expense-report';
import {
	handlerByOperation as mileageAllowanceHandlerByOperation,
	operationsProperty as mileageAllowanceOperationsProperty,
	resource as mileageAllowanceResource,
	setups as mileageAllowanceSetups,
} from './mileage-allowance';
import {
	handlerByOperation as operationHandlerByOperation,
	operationsProperty as operationOperationsProperty,
	resource as operationResource,
	setups as operationSetups,
} from './operation';
import { ExecuteHandler } from '../../utils';
import { INodeProperties } from 'n8n-workflow';

export const property: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	default: '',
	noDataExpression: true,
	options: [expenseResource, mileageAllowanceResource, operationResource],
};

export const operationsProperties: INodeProperties[] = [
	expenseOperationsProperty,
	mileageAllowanceOperationsProperty,
	operationOperationsProperty,
];

export const handlerByOperationByResource: Record<string, Record<string, ExecuteHandler>> = {
	[expenseResource.value]: expenseHandlerByOperation,
	[mileageAllowanceResource.value]: mileageAllowanceHandlerByOperation,
	[operationResource.value]: operationHandlerByOperation,
};

export const setups = [...expenseSetups, ...mileageAllowanceSetups, ...operationSetups];
