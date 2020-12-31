export function isEmpty(s: string) {
  return s.trim().length === 0;
}

export function parseDate(input: any) {
  const parts = input.match(/(\d+)/g);

  return new Date(parts[0], parts[1] - 1, parts[2]);
}
