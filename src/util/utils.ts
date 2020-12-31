export function isEmpty(s: string) {
  RegExp(/^(?![\s\S]/).test(s);
}
