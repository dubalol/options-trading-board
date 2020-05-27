const _ = require('lodash');

export const mapOptions = (contracts, currentDayAheadId) => {
  // Returns an object that looks like
  // expiration: {
  //   strike: {
  //     put: id
  //     call: id
  //   }
  //   ...
  // }

  const ids = Object.keys(contracts).filter(id => id !== currentDayAheadId.toString());

  const grouped = _.groupBy(ids, (id) => {
    return contracts[id].date_expires
  })

  const expiryDates = Object.keys(grouped);
  // console.log(expiryDates);

  expiryDates.forEach(date => {
    grouped[date] = _.groupBy(grouped[date], (id) => {
      return contracts[id].strike_price
    })

    const strikes = Object.keys(grouped[date]);
    strikes.forEach(strike => {
      grouped[date][strike] = _.groupBy(grouped[date][strike], (id) => {
        return contracts[id].type
      })
    })
  })

  return grouped
}