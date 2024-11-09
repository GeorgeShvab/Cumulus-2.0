export const capitalizeLetter = (value: string) =>
  value.at(0)?.toUpperCase() + value.slice(1, value.length)
