import { dateSchema } from './date';

export const dateRangeSchema = {
  type: 'object',
  properties: {
    from: dateSchema,
    to: dateSchema
  }
};
