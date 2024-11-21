import {
	IExecuteFunctions,
	INodeExecutionData,
	NodeExecutionWithMetadata,
} from 'n8n-workflow/dist/Interfaces';
import { ILoadOptionsFunctions } from 'n8n-workflow';

export type ExecuteHandler = (
	ctxt: IExecuteFunctions,
) => Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null>;

export type Displayable = {
	displayOptions: {
		show: {
			resource: string[];
			operation: string[];
		};
	};
};

export function linkResOp(prop: Displayable, resource: string, operation: string) {
	if (!prop.displayOptions.show.resource.includes(resource)) {
		prop.displayOptions.show.resource.push(resource);
	}
	if (!prop.displayOptions.show.operation.includes(operation)) {
		prop.displayOptions.show.operation.push(operation);
	}
}
export function getValue<T>(ctxt: ILoadOptionsFunctions, name: string): T;
export function getValue<T>(ctxt: IExecuteFunctions, name: string, idx: number): T;
export function getValue<T>(
	ctxt: IExecuteFunctions | ILoadOptionsFunctions,
	name: string,
	idx?: number,
): T {
	const param =
		'getCurrentNodeParameter' in ctxt
			? ctxt.getNodeParameter(name)
			: ctxt.getNodeParameter(name, idx!);
	if (param && typeof param === 'object' && 'value' in param) {
		return param.value as T;
	}
	return param as T;
}
