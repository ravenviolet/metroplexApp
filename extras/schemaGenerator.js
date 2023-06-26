const pipedrive = require('pipedrive');
const mongoose = require('mongoose');

async function generateSchema() {
  const defaultClient = new pipedrive.ApiClient();
  let apiToken = defaultClient.authentications.api_key;
  apiToken.apiKey ='adee9abc6e0b3449db978340e0fd9ea104923205';

  let dealFields = [];
  let page = 1;
  let hasMore = true;

   while (hasMore) {
    const response = await defaultClient.callApi(`/fieldDefinitions/deal`,
    'GET',
    {},
    { page, limit: 100 },
    {}, 
    {},
    {},
    [],
    [],
    []
    );

    dealFields = [...dealFields, ...response.data];

    page += 1;
    hasMore = response.additional_data.pagination.more_items_in_collection;
    }

  const fields = {};

  for (const field of dealFields) {
    const fieldName = field.key;
    let fieldType;

    switch (field.field_type) {
      case 'varchar':
      case 'text':
        fieldType = String;
        break;
      case 'int':
      case 'double':
        fieldType = Number;
        break;
      case 'monetary':
        fieldType = {
          amount: Number,
          currency: String
        };
        break;
      // ...add more cases for other field types...
      default:
        fieldType = String;
        break;
    }

    fields[fieldName] = {
      type: fieldType,
      required: field.is_required
    };
  }

  return new mongoose.Schema(fields);
}

module.exports = { generateSchema };
