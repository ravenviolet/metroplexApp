const pipedrive = require('pipedrive');
// const defaultClient = pipedrive.ApiClient.instance;
const { mapDeal } = require('./pipeMap');
const { Job } = require('./models/model');

// Configure Pipedrive API client
const defaultClient = new pipedrive.ApiClient();
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = 'adee9abc6e0b3449db978340e0fd9ea104923205';
// defaultClient.authentications.oauth2.accessToken = process.env.PIPEDRIVE_API_KEY;

// Create a new deal and write it to MongoDB using the mapDeal function
async function createDeal() {
  try {
    const api = new pipedrive.DealsApi(defaultClient);
    const newDeal = new pipedrive.NewDeal();
    newDeal.title = 'Test Deal';
    newDeal.value = 1000;
    newDeal.currency = 'USD';
    // newDeal.stage_id = 4;
    newDeal.orgId = 1; // Replace with your organization ID
    const deal = await api.addDeal(newDeal);

    const mappedDeal = mapDeal(deal.data);
    const data = new Job(mappedDeal);
    const savedData = await data.save();
    console.log(savedData);
  } catch (error) {
    console.error(error);
  }
}

createDeal();
