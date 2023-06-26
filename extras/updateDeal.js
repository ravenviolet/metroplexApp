const pipedrive = require('pipedrive');
const defaultClient = pipedrive.ApiClient.instance;
const { mapDeal } = require('./pipeMap');
const { Job } = require('./model');

// Configure Pipedrive API client
defaultClient.authentications.oauth2.accessToken = process.env.PIPEDRIVE_API_TOKEN;

// Update an existing deal and write the updated deal to MongoDB using the mapDeal function
async function updateDeal(dealId, stageId) {
  try {
    const api = new pipedrive.DealsApi(defaultClient);
    const deal = await api.getDeal(dealId);
    deal.stageId = stageId;
    const updatedDeal = await api.updateDeal(dealId, deal);

    const mappedDeal = mapDeal(updatedDeal.data);
    const data = new Job(mappedDeal);
    const savedData = await data.save();
    console.log(savedData);
  } catch (error) {
    console.error(error);
  }
}

updateDeal(1, 2); // Replace 1 with the ID of the deal you want to update, and 2 with the ID of the new stage
