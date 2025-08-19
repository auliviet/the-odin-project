export default function formatLabel(str: string): string {
  const stringSpaced = str
    .replace(
      /([a-z])([A-Z])/g,
      (_: string, lower: string, upper: string): string => `${lower} ${upper}`
    )
    .toLowerCase();
  const labelCapitalised =
    stringSpaced[0].toUpperCase() + stringSpaced.slice(1);
  return labelCapitalised;
}
