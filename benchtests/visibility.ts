export enum Visibility {
  IMPLICIT_PRIVATE,
  EXPLICIT_PRIVATE,
  PROTECTED,
  PUBLIC,
  GLOBAL,
}

export function displayVisibility(value: Visibility): string {
  return Visibility[value].toLowerCase();
}
