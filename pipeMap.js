function mapDeal(pipedriveDeal) {
    return {
      name: pipedriveDeal.title,
      value: pipedriveDeal.amount
    };
  }
  
  module.exports = { mapDeal };
  