import { INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import {
	handler as validateHandler,
	operation as validateOperation,
	setup as validateSetup,
} from './validate';
import {
	handler as deleteHandler,
	operation as deleteOperation,
	setup as deleteSetup,
} from './delete';
import { ExecuteHandler } from '../../../../utils';

export const operationsOptions: INodePropertyOptions[] = [validateOperation, deleteOperation];

export const handlerByOperation: Record<string, ExecuteHandler> = {
	[validateOperation.value]: validateHandler,
	[deleteOperation.value]: deleteHandler,
};

export const setups = [validateSetup, deleteSetup];
