import axios from 'axios';

export const Locales = {
  VI: 'vi',
  EN: 'en',
  JA: 'ja',
  KR: 'kr',
};

export const Roles = {
  ADMIN: 1,
  USER: 2,
};

export const PaymentTypes = {
  CASH: 'cash',
  VNPAY: 'vnPay',
};

export const OrderStatus = {
  PROCESSING: 'processing',
  PREPARING: 'preparing',
  SHIPPING: 'shipping',
  RECEIVED: 'received',
  CANCELED: 'canceled',
};

export const LocalesFullText = {
  VI: 'Vietnamese',
  EN: 'English',
  JA: 'Japanese',
  KR: 'Korean',
};

export const CODE_COMMON_FAILED = axios.HttpStatusCode.InternalServerError;

export const BASE_URL = '/api/v1';

export const APP_LOCALES = [Locales.EN];

export const VALIDATION_ERROR = 'Validation error';

export const HTTP_CODE = axios.HttpStatusCode;

export const ErrorMessage = {
  UNIQUE: 'duplicate key value violates unique constraint',
  QUERY_WRONG: 'Make sure your query is correct.',
  DATE_TIME_INVALID: 'date/time field value out of range',
  FAILING_ROW: 'Failing row contains',
  FIELD_REQUIRED: 'can be not blank',
  MIN_LENGTH: 'min',
  INVALID_EMAIL: 'INVALID_EMAIL',
  LENGTH: 'LENGTH',
  INVALID_DATE: 'INVALID_DATE',
  INVALID_BOOLEAN: 'INVALID_BOOLEAN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export const DEFAULT_PAGINATION = {
  size: 12,
  page: 1,
};

export const SEARCH_BY = {
  USER: ['id', 'username'],
  PRODUCT: ['name', 'description'],
  ORDER: ['id', 'user.username'],
  CATEGORY: ['name'],
  VOUCHER: ['code', 'id'],
};

export const QUERY_PARAM_PARSE = {
  false: false,
  true: true,
};

export const PHONE_REGEX = /^\d{10}$/;
