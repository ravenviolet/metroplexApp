const { Job } = require('./model');
async function dupDeals(db){
//   const dealsCollection = db.collection('deals');

  const allDeals = await Job.find();

  const dupDeals = allDeals.reduce((acc, deal) => {
    const existingDeal = acc.find((d) => d.deal_id === deal.deal_id);
    if (!existingDeal || existingDeal.timestamp > deal.timestamp) {
        acc = acc.filter((d) => d.deal_id !== deal.deal_id);
        acc.push(deal);
    }
    return acc;
  }, []);

  await Job.deleteMany({});

  for (const job of dupDeals) {
    const newDeal = new Job(job);
    await newDeal.save();
  }

  console.log('Deals updated successfully');
}

module.exports = dupDeals;
