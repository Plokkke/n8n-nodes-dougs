import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeExecutionWithMetadata,
	NodeOperationError,
} from 'n8n-workflow';
import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow/dist/Interfaces';

import {
	handlerByOperationByResource,
	operationsProperties,
	property as ressourcesProperty,
	setups,
} from './resources';
import { methods, properties } from './properties';

export class Dougs implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dougs',
		name: 'dougs',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:logo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Manipulate Dougs data',
		defaults: {
			name: 'Dougs',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'dougsLoginApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.dougs.fr',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [ressourcesProperty, ...operationsProperties, ...properties],
	};

	methods = methods;

	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const handler = handlerByOperationByResource[resource][operation];
		if (!handler) {
			throw new NodeOperationError(
				this.getNode(),
				`Handler missing for resource "${resource}" and operation "${operation}".`,
			);
		}

		return handler(this);
	}
}

for (const setup of setups) {
	setup();
}
