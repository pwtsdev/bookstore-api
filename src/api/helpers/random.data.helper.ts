import { faker } from '@faker-js/faker';

export function getRandomFirstName(): string {
  return faker.person.firstName().replaceAll("'", '');
}

export function getRandomLastName(): string {
  return faker.person.lastName().replaceAll("'", '');
}
