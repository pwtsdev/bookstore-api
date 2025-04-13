import { faker } from '@faker-js/faker';

export function getRandomFirstName(): string {
  return faker.person.firstName().replaceAll("'", '');
}

export function getRandomLastName(): string {
  return faker.person.lastName().replaceAll("'", '');
}

export function getRandomFullName(): string {
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  return `${firstName} ${lastName}`;
}

export function getRandomBookTitle(): string {
  return faker.lorem.words(3);
}

export function getRandomCity(): string {
  return faker.location.city().replaceAll("'", '');
}

export function getRandomStreet(): string {
  return faker.location.street().replaceAll("'", '');
}

export function getRandomZipCode(): string {
  return faker.location.zipCode('##-###');
}

export function getRandomEmail(): string {
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  return faker.internet.email({ firstName, lastName }).toLowerCase();
}
