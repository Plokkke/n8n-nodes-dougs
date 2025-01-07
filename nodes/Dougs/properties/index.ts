import * as _ from 'lodash';

import { property as amount } from './amount';
import { methods as categoryIdMethods, property as categoryId } from './categoryId';
import { methods as companyIdMethods, property as companyId } from './companyId';
import { property as date } from './date';
import { property as hasVat } from './hasVat';
import { property as memo } from './memo';
import { methods as partnerIdMethods, property as partnerId } from './partnerId';
import { property as distance } from './distance';
import { property as carId, methods as carIdMethods } from './carId';
import { property as operationId } from './operationId';
import { property as fileName } from './fileName';
import { property as binaryFieldName } from './binaryFieldName';
import { property as invoiceType } from './invoiceType';

export const propertyByName = {
	companyId,
	date,
	memo,
	amount,
	categoryId,
	fileName,
	partnerId,
	hasVat,
	distance,
	carId,
	operationId,
	binaryFieldName,
	invoiceType
};

export const properties = Object.values(propertyByName);

export const methods = _.merge(
	{},
	carIdMethods,
	categoryIdMethods,
	companyIdMethods,
	partnerIdMethods,
);
