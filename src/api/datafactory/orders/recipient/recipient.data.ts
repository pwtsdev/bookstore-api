import { RecipientPayload } from '@api-models/orders/recipient.model';
import {
  getRandomCity,
  getRandomEmail,
  getRandomFirstName,
  getRandomStreet,
  getRandomZipCode,
} from '@helpers/random.data.helper';

export function getRandomRecipientPayload(): RecipientPayload {
  const randomFirstName = getRandomFirstName();
  const randomLastName = getRandomFirstName();
  const randomCity = getRandomCity();
  const randomStreet = getRandomStreet();
  const randomZipCode = getRandomZipCode();
  const randomEmail = getRandomEmail();

  return {
    name: `${randomFirstName} ${randomLastName}`,
    phone: '600700800',
    street: randomStreet,
    city: randomCity,
    zipCode: randomZipCode,
    email: randomEmail,
  };
}
