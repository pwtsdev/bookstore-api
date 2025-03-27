import { faker } from '@faker-js/faker';

export function getRandomFirstName(): string {
  return faker.person.firstName();
}

export function getRandomLastName(): string {
  return faker.person.lastName();
}
