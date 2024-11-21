import { INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { handler as createHandler, operation as createOp, setup as createSetup } from './create';
import { ExecuteHandler } from '../../../../utils';

export const operationsOptions: INodePropertyOptions[] = [createOp];

export const handlerByOperation: Record<string, ExecuteHandler> = {
	[createOp.value]: createHandler,
};

export const setups = [createSetup];
