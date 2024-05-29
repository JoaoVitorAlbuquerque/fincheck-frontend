export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  const sanitizedString = value.replace(/,/g, '');
  return Number(sanitizedString);
}


// const sanitizedString = value.replace(/\./g, '').replace(',', '.'); -> usar esta quando consertar o "initialBalance"
