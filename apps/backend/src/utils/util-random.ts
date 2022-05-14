import { AccountDepartment, Individual, Legal } from '@prisma/client';

export const randomString = () => {
  return (
    Math.floor(Math.random() * (999999999999999 - 100000000000000)) +
    100000000000000
  ).toString();
};

export const generate = (firstNumber: string) => {
  const random = randomString();
  return firstNumber + random;
};

export const generateNumberAccount = (
  list: AccountDepartment[] | Individual[] | Legal[],
  firstNumber: string
) => {
  let number = '';
  let flag = false;
  while (!flag) {
    const random = generate(firstNumber);
    flag = true;
    for (const acc of list) {
      if (acc.number === random) {
        flag = false;
        break;
      }
    }
    if (flag) {
      number = random;
    }
  }
  return number;
};
