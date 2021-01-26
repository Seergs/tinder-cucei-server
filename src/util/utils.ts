export function isEmpty(s: string) {
  return s.trim().length === 0;
}

export function parseDate(input: any) {
  const parts = input.match(/(\d+)/g);

  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function parseCookies(cookiesUnparsed: string) {
  const cookies = cookiesUnparsed.replace(/;([P,p]ath|HttpOnly)(=\/)*/g, "");

  return cookies.split(", ").join("; ");
}

export function getAgeFromDateOfBirth(dob: Date) {
  const difference = Date.now() - dob.getTime();

  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
