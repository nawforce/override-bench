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

export function visibilityKeyword(value: Visibility): string {
  switch (value) {
    case Visibility.IMPLICIT_PRIVATE:
      return "";
    case Visibility.EXPLICIT_PRIVATE:
      return "private";
    case Visibility.PROTECTED:
      return "protected";
    case Visibility.PUBLIC:
      return "public";
    case Visibility.GLOBAL:
      return "global";
  }
}
