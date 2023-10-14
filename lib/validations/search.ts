// Check if search string contains only letters,
// digits, whitespaces, underscore, '.' and '-'
export const isValidSearch = (search: string) =>
  !/[^\w\s\-\.а-яА-ЯёЁ]/.test(search);
