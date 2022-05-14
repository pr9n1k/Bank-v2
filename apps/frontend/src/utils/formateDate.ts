export const formateDate = (dateNumber: number | Date): string => {
  let date: Date;
  if (typeof dateNumber === 'number') {
    date = new Date(dateNumber * 1000);
  } else {
    date = new Date(dateNumber);
  }
  const year = date.getFullYear();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}.${month}.${year}`;
};
