import {
  ORDER_RECIPIENT_CITY_INCORRECT_DATA,
  ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
  ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  ORDER_RECIPIENT_PHONE_INCORRECT_DATA,
  ORDER_RECIPIENT_STREET_INCORRECT_DATA,
  ORDER_RECIPIENT_ZIP_CODE_INCORRECT_DATA,
} from '@const/response.errors.const';
import { getRandomRecipientOverridePayload } from '@datafactory/orders/recipient/recipient.data';
import { getRandomFirstName, getRandomFullName, getRandomLastName } from '@helpers/random.data.helper';

export const invalidRecipientPayload = [
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: null as unknown as string }),
    description: 'empty name',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: `1${getRandomFullName()}` }),
    description: 'invalid name - starts with number',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: `${getRandomFullName()}1` }),
    description: 'invalid name - ends with number',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: `${getRandomFirstName()} 123 ${getRandomLastName()}` }),
    description: 'invalid name - contains number',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: 123456 as unknown as string }),
    description: 'invalid format name',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ name: undefined }),
    description: 'missing name',
    errorMessage: ORDER_RECIPIENT_NAME_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ phone: '' }),
    description: 'empty phone',
    errorMessage: ORDER_RECIPIENT_PHONE_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ phone: undefined }),
    description: 'missing phone',
    errorMessage: ORDER_RECIPIENT_PHONE_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ street: '' }),
    description: 'empty street',
    errorMessage: ORDER_RECIPIENT_STREET_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ street: undefined }),
    description: 'missing street',
    errorMessage: ORDER_RECIPIENT_STREET_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ street: 123456 as unknown as string }),
    description: 'invalid format street',
    errorMessage: ORDER_RECIPIENT_STREET_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ city: '' }),
    description: 'empty city',
    errorMessage: ORDER_RECIPIENT_CITY_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ city: undefined }),
    description: 'missing city',
    errorMessage: ORDER_RECIPIENT_CITY_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ city: 123456 as unknown as string }),
    description: 'invalid format city',
    errorMessage: ORDER_RECIPIENT_CITY_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ zipCode: '' }),
    description: 'empty zip code',
    errorMessage: ORDER_RECIPIENT_ZIP_CODE_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ zipCode: 123456 as unknown as string }),
    description: 'invalid format zip code',
    errorMessage: ORDER_RECIPIENT_ZIP_CODE_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ zipCode: undefined }),
    description: 'missing zip code',
    errorMessage: ORDER_RECIPIENT_ZIP_CODE_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ email: '' }),
    description: 'empty email',
    errorMessage: ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ email: 'bartek_malpa.com' }),
    description: 'invalid email',
    errorMessage: ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
  },
  {
    recipientPayload: getRandomRecipientOverridePayload({ email: undefined }),
    description: 'missing email',
    errorMessage: ORDER_RECIPIENT_EMAIL_INCORRECT_DATA,
  },
];
