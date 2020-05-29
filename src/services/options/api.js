import moment from "moment";

export const getContracts = async () => {
  // const ts = "2020-05-28T00:00:00.000Z"
  // const ts = moment().subtract(1, "days").toISOString();
  // const limit = 0;

  // const proxyURL = 'https://cors-anywhere.herokuapp.com';
  // const apiURL = 'https://trade.ledgerx.com/api/contracts';
  // const queryString = `after_ts=${ts}&limit=${limit}`;

  // const results = await fetch(`${proxyURL}/${apiURL}?${queryString}`)
  const results = await fetch(`http://localhost:3000/api/contracts`)
  .then(res => res.json())
    .then(json => json.data)
    .catch(err => console.log(err))

  return results;
}

export const getBookTops = async () => {
    // const proxyURL = 'https://cors-anywhere.herokuapp.com';
    // const apiURL = 'https://trade.ledgerx.com/api/book-tops';
  
    // const results = await fetch(`${proxyURL}/${apiURL}`)
    const results = await fetch(`http://localhost:3000/api/book-tops`)
    .then(res => res.json())
      .then(json => json.data)
      .catch(err => console.log(err))
  
    return results;
}