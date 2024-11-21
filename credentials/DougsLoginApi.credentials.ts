import { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

import { DougsApiByLogin, DougsCredentials } from '@plokkke/dougs-compta';
import { ICredentialDataDecryptedObject, IHttpRequestOptions } from 'n8n-workflow/dist/Interfaces';

export class DougsLoginApi implements ICredentialType {
	name = 'dougsLoginApi';
	displayName = 'Dougs Login API';
	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const dougsApi = new DougsApiByLogin(credentials as DougsCredentials);

		requestOptions.headers = {
			...requestOptions.headers,
			Cookie: `auth_session=${await dougsApi.getSessionToken()}`,
		};

		return requestOptions;
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.dougs.fr',
			url: '/users/me',
		},
	};
}
