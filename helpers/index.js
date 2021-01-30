export const convertPrice = ({price, currencyRates, baseCurrency}) => {
  let convertedPrice
  switch (baseCurrency) {
    case 'USD':
      convertedPrice = '$' + price.toFixed(2)
      break
    case 'JPY':  
    convertedPrice = '¥' + (price * currencyRates.JPY).toFixed(2)
    break
    case 'GBP': 
    convertedPrice = '£' + (price * currencyRates.GBP).toFixed(2)
    break 
    case 'EUR': 
    convertedPrice = '€' + (price * currencyRates.EUR).toFixed(2)
    break
    default:
      convertedPrice = '$' + price.toFixed(2)
      break;
  }
  return convertedPrice
}