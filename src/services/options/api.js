import moment from "moment";

export const getContracts = async () => {
  // adjust ts to prior business day?
  const ts = "2020-05-28T00:00:00.000Z"
  // const ts = moment().toISOString()
  const limit = 0;

  const proxyURL = 'https://cors-anywhere.herokuapp.com';
  const apiURL = 'https://trade.ledgerx.com/api/contracts';
  const queryString = `after_ts=${ts}&limit=${limit}`;

  const results = await fetch(`${proxyURL}/${apiURL}?${queryString}`)
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => console.log(err))

  return results;
}

export const getBookTops = async () => {
    const proxyURL = 'https://cors-anywhere.herokuapp.com';
    const apiURL = 'https://trade.ledgerx.com/api/book-tops';
  
    const results = await fetch(`${proxyURL}/${apiURL}`)
      .then(res => res.json())
      .then(json => json.data)
      .catch(err => console.log(err))
  
    return results;
}