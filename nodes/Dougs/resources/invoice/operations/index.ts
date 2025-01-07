import { INodePropertyOptions } from 'n8n-workflow/dist/Interfaces';
import { handler as uploadHandler, operation as uploadOp, setup as uploadSetup } from './upload';
import { ExecuteHandler } from '../../../../utils';

export const operationsOptions: INodePropertyOptions[] = [uploadOp];

export const handlerByOperation: Record<string, ExecuteHandler> = {
	[uploadOp.value]: uploadHandler,
};

export const setups = [uploadSetup];
