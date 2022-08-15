export const getFlagAlt = (countryName: string | undefined) => {
  if (!countryName) {
    return undefined;
  }

  const lastChar = countryName[countryName.length - 1];

  return `This is the ${countryName}${lastChar === "s" ? "'" : "'s"} flag`;
};
