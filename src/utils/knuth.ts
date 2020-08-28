import { isNil } from 'ramda';

const knuth = (array: array): array => {
  if (isNil(array)) return array;
  let index = array.length;

  while (index !== 0) {
    const randomIndex = Math.floor(Math.random() * index);
    index -= 1;
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }

  return array;
};

export default knuth;
