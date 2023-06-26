//All tutorial Node.Js code examples are for reference only and shouldn’t be used in production code as is. In production, a new new pipedrive.ApiClient() instance should be initialised separately for each request.
const pipedrive = require('pipedrive');
const defaultClient = new pipedrive.ApiClient();

// Configure authorization by settings api key
// PIPEDRIVE_API_KEY is an environment variable that holds real api key
defaultClient.authentications.oauth2.accessToken = process.env.PIPEDRIVE_API_TOKEN;
defaultClient.authentications.oauth2.refreshToken = process.env.PIPEDRIVE_API_REFRESH_TOKEN;

async function addDeal() {
    try {
        console.log('Sending request...');

        const api = new pipedrive.DealsApi(defaultClient);

        const data = {
            title: 'Deal of the century',
            value: 10000,
            currency: 'USD',
            user_id: null,
            person_id: null,
            org_id: 1,
            stage_id: 10,
            status: 'open',
            expected_close_date: '2022-02-11',
            probability: 60,
            lost_reason: null,
            visible_to: 1,
            add_time: '2021-02-11 014:00:00',
        }
        const response = await api.addDeal(data);

        console.log('Deal was added successfully!', response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Adding failed', errorToLog);
    }
}


addDeal();