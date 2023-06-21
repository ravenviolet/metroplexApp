// const express = require('express');
// const router = express.Router();
// const { Job } = require('../models/model');
// const pipedrive = require('pipedrive');
// const { mapDeal, mapTechnician } = require('../pipeMap.js');
// const defaultClient = new pipedrive.ApiClient();

// //This code represents updating deals via the Pipedrive webhook
// router.use(express.json());
// let apiToken = defaultClient.authentications.api_key;
// apiToken.apiKey = 'adee9abc6e0b3449db978340e0fd9ea104923205';

// //webhook for deal update
// router.post('/', async (req, res) => {
//   try {
//     // Process the webhook payload here
//     console.log('Webhook received:', req.body);

//     const eventType = req.body.meta.action; // Get the event type from the webhook payload
//     console.log(eventType);
//     if (eventType === 'updated') { 
//       const updatedTech = req.body.current; // Get the updated deal data from the webhook payload

//       // Process the updated deal data
//       console.log(`Tech updated. New tech:`, updatedTech );

//       // Update the fields for the deal ID in the MongoDB collection:      
//       const techId = req.body.meta.id;

//       // Extract updated fields
//       //ORG_ID??**********
//       const {
//         creator_user_id,
//         user_id,
//         org_name,
//         stage_id,
//         title,
//         value,
//         currency,
//         add_time,
//         update_time,
//         stage_change_time,
//         active,
//         deleted,
//         status,
//         probability,
//         next_activity_date,
//         next_activity_time,
//         next_activity_id,
//         last_activity_id,
//         last_activity_date,
//         lost_reason,
//         visible_to,
//         close_time,
//         pipeline_id,
//         won_time,
//         first_won_time,
//         lost_time,
//         products_count,
//         files_count,
//         notes_count,
//         followers_count,
//         email_messages_count,
//         activities_count,
//         done_activities_count,
//         undone_activities_count,
//         participants_count,
//         expected_close_date,
//         last_incoming_mail_time,
//         last_outgoing_mail_time,
//         label,
//         stage_order_nr,
//         person_name,
//         next_activity_subject,
//         next_activity_type,
//         next_activity_duration,
//         next_activity_note,
//         formatted_value,
//         weighted_value,
//         formatted_weighted_value,
//         weighted_value_currency,
//         rotten_time,
//         owner_name,
//         cc_email,
//         org_hidden,
//         person_hidden,
//         pipeline,
//         '87bccaa66e94e9fb339a2adc343333fa900fbe27': deal_notes,
//         '77b85cff28201abfec9f626c357ceec59e075636_locality': city_name,
//         '77b85cff28201abfec9f626c357ceec59e075636_admin_area_level_1': state_name,
//         'bb04ca63627f17ecb02aac6a7260876c6492079f': community_name,
//         '0c83313fba78b12676463126f74527552763ec8e': technicianId,
//         '52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_i': timezone_id,
//         'a5ed135fe1d0c912d151685da4f86620106e074f': event_date,
//         '52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f': event_start_time

//       } = updatedDeal;

//       //need error handling for MongoDB queries
//       const deal_id = dealId;

//       // Check if a job with the given deal_id and technicianId exists
//       const existingJob = await Job.findOne({
//         deal_id: deal_id,
//         'technician_fields.value': technicianId,
//       });
      
//       // If the job doesn't exist, fetch the deal details and create a new job
//       if (!existingJob) {

//           // const mappedDeal = mapDeal(updatedDeal);
//           // return new Job(mappedDeal).save();
//         // router.get('/deal/:id', async (req, res) => {
//         try {
//           console.log('Updating Job Field');
//           const api = new pipedrive.DealsApi(defaultClient);
          
//           // Fetch the deal details
//           const { data } = await api.getDeal(dealId);
          
//           const mappedDeal = mapDeal(data);
//           console.log(data);

//           const savedDeal = await new Job(mappedDeal).save();
//           console.log('Saved deal to MongoDB');
//           // res.status(200).json(savedDeal);

//           // Extract the technician details from the deal
//           const newTechnician = deal['0c83313fba78b12676463126f74527552763ec8e'];
      
//           // If the technician details exist, update the job
//           if (newTechnician) {
//             await Job.updateOne(
//               { deal_id: dealId },
//               {
//                 $set: {
//                   'technician_fields.active_flag': newTechnician.active_flag,
//                   'technician_fields.name': newTechnician.name,
//                   'technician_fields.email.value': newTechnician.email.value,
//                   'technician_fields.email.primary': newTechnician.email.primary,
//                   'technician_fields.phone.value': newTechnician.phone.value,
//                   'technician_fields.phone.primary': newTechnician.phone.primary,
//                   'technician_fields.owner_id': newTechnician.owner_id,
//                   'technician_fields.value': newTechnician.value,
//                 },
//               }
//             );
//           } else {
//             console.log(`Technician details not available for deal: ${deal_id}`);
//           }
//         } catch (error) {
//           console.error('Error updating job field:', error);
//         }
//         // )};
//       }
      
      
//       await Job.updateOne(
//         { deal_id: dealId },
//         {
//           $set: {
//             'creator_user_id.id': creator_user_id,
//             'user_id.id': user_id,
//             'org_id.name': org_name,
//             stage_id,
//             title,
//             value,
//             currency,
//             add_time,
//             update_time,
//             stage_change_time,
//             active,
//             deleted,
//             status,
//             probability,
//             next_activity_date,
//             next_activity_time,
//             next_activity_id,
//             last_activity_id,
//             last_activity_date,
//             lost_reason,
//             visible_to,
//             close_time,
//             pipeline_id,
//             won_time,
//             first_won_time,
//             lost_time,
//             products_count,
//             files_count,
//             notes_count,
//             followers_count,
//             email_messages_count,
//             activities_count,
//             done_activities_count,
//             undone_activities_count,
//             participants_count,
//             expected_close_date,
//             last_incoming_mail_time,
//             last_outgoing_mail_time,
//             label,
//             stage_order_nr,
//             person_name,
//             next_activity_subject,
//             next_activity_type,
//             next_activity_duration,
//             next_activity_note,
//             formatted_value,
//             weighted_value,
//             formatted_weighted_value,
//             weighted_value_currency,
//             rotten_time,
//             owner_name,
//             cc_email,
//             org_hidden,
//             person_hidden,
//             pipeline,
//             deal_notes,
//             city_name,
//             state_name,
//             community_name,
//             // 'technician_fields.value': technicianId,
//             timezone_id,
//             event_date,
//             event_start_time
//           }
//         }
//       );
//     }

//     // Send a success response
//     res.status(200).json({ message: 'Webhook processed successfully' });
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     res.status(500).json({ message: 'Error processing webhook' });
//   }
// });

// module.exports = router;


