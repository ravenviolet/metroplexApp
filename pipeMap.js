const  { Job, Technician } = require('./models/model');

module.exports = { mapDeal, mapTechnician };

function mapDeal(pipedriveDeal) {
  // Map Pipedrive deal fields to Mongoose Job model fields here
  const mappedDeal = {
    deal_id: pipedriveDeal.id,
    creator_user_id: {
      id: (pipedriveDeal.creator_user_id ?? {}).id ?? '',
      name: (pipedriveDeal.creator_user_id ?? {}).name ?? '',
      email: (pipedriveDeal.creator_user_id ?? {}).email ?? '',
      active_flag: (pipedriveDeal.creator_user_id ?? {}).active_flag ?? false,
      value: (pipedriveDeal.creator_user_id ?? {}).value ?? null
    },
    user_id: {
      id: (pipedriveDeal.user_id ?? {}).id ?? '',
      name: (pipedriveDeal.user_id ?? {}).name ?? '',
      email: (pipedriveDeal.user_id ?? {}).email ?? '',
      active_flag: (pipedriveDeal.user_id ?? {}).active_flag ?? false,
      value: (pipedriveDeal.user_id ?? {}).value ?? null
    },
    person_id: pipedriveDeal.person_id ?? '',
    org_id: {
      name: (pipedriveDeal.org_id ?? {}).name ?? '',
      people_count: (pipedriveDeal.org_id ?? {}).people_count ?? null,
      owner_id: (pipedriveDeal.org_id ?? {}).owner_id ?? null,
      address: (pipedriveDeal.org_id ?? {}).address ?? '',
      active_flag: (pipedriveDeal.org_id ?? {}).active_flag ?? false,
      cc_email: (pipedriveDeal.org_id ?? {}).cc_email ?? '',
      value: (pipedriveDeal.org_id ?? {}).value ?? null
    },
    stage_id: pipedriveDeal.stage_id ?? null,
    title: pipedriveDeal.title ?? '',
    value: pipedriveDeal.value ?? null,
    currency: pipedriveDeal.currency ?? '',
    add_time: pipedriveDeal.add_time ?? null,
    update_time: pipedriveDeal.update_time ?? null,
    stage_change_time: pipedriveDeal.stage_change_time ?? '',
    active: pipedriveDeal.active ?? false,
    deleted: pipedriveDeal.deleted ?? false,
    status: pipedriveDeal.status ?? false,
    probability: pipedriveDeal.probability ?? null,
    next_activity_date: pipedriveDeal.next_activity_date ?? null,
    next_activity_time: pipedriveDeal.next_activity_time ?? null,
    next_activity_id: pipedriveDeal.next_activity_id ?? null,
    last_activity_id: pipedriveDeal.last_activity_id ?? null,
    last_activity_date: pipedriveDeal.last_activity_date ?? null,
    lost_reason: pipedriveDeal.lost_reason ?? '',
    visible_to: pipedriveDeal.visible_to ?? null,
    close_time: pipedriveDeal.close_time ?? null,
    pipeline_id: pipedriveDeal.pipeline_id ?? null,
    won_time: pipedriveDeal.won_time ?? null,
    first_won_time: pipedriveDeal.first_won_time ?? null,
    lost_time: pipedriveDeal.lost_time ?? null,
    products_count: pipedriveDeal.products_count ?? null,
    files_count: pipedriveDeal.files_count ?? null,
    notes_count: pipedriveDeal.notes_count ?? null,
    followers_count: pipedriveDeal.followers_count ?? null,
    email_messages_count: pipedriveDeal.email_messages_count ?? null,
    activities_count: pipedriveDeal.activities_count ?? null,
    done_activities_count: pipedriveDeal.done_activities_count ?? null,
    undone_activities_count: pipedriveDeal.undone_activities_count ?? null,
    participants_count: pipedriveDeal.participants_count ?? null,
    expected_close_date: pipedriveDeal.expected_close_date ?? null, last_incoming_mail_time: pipedriveDeal.last_incoming_mail_time ?? null,
    last_outgoing_mail_time: pipedriveDeal.last_outgoing_mail_time ?? null,
    label: pipedriveDeal.label ?? '',
    stage_order_nr: pipedriveDeal.stage_order_nr ?? null,
    person_name: pipedriveDeal.person_name ?? '',
    org_name: pipedriveDeal.org_name ?? '',
    next_activity_subject: pipedriveDeal.next_activity_subject ?? '',
    next_activity_type: pipedriveDeal.next_activity_type ?? '',
    next_activity_duration: pipedriveDeal.next_activity_duration ?? '',
    next_activity_note: pipedriveDeal.next_activity_note ?? '',
    formatted_value: pipedriveDeal.formatted_value ?? '',
    weighted_value: pipedriveDeal.weighted_value ?? null,
    formatted_weighted_value: pipedriveDeal.formatted_weighted_value ?? '',
    weighted_value_currency: pipedriveDeal.weighted_value_currency ?? '',
    rotten_time: pipedriveDeal.rotten_time ?? '',
    owner_name: pipedriveDeal.owner_name ?? '',
    cc_email: pipedriveDeal.cc_email ?? '',
    org_hidden: pipedriveDeal.org_hidden ?? false,
    person_hidden: pipedriveDeal.person_hidden ?? false,
    pipeline: pipedriveDeal.pipeline ?? '',
    deal_notes: pipedriveDeal['87bccaa66e94e9fb339a2adc343333fa900fbe27'] ?? '',
    stage_id: pipedriveDeal.stage_id,
    city_name: pipedriveDeal['77b85cff28201abfec9f626c357ceec59e075636_locality'] ?? '',
    state_name: pipedriveDeal['77b85cff28201abfec9f626c357ceec59e075636_admin_area_level_1'] ?? '',
    community_name: pipedriveDeal['bb04ca63627f17ecb02aac6a7260876c6492079f'] ?? '',
    technician_name: pipedriveDeal['0c83313fba78b12676463126f74527552763ec8e']?.name ?? 'Default Name',
    timezone_id: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_i'] ?? '',
    event_date: pipedriveDeal['a5ed135fe1d0c912d151685da4f86620106e074f'] ?? '',
    event_start_time: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f'] ?? ''
  };

  return new Job(mappedDeal);
}

function mapTechnician(pipedrivePerson) {
  // Map Pipedrive person fields to Mongoose Technician model fields here
  const mappedTechnician = {
    id: pipedrivePerson.id,
    name: pipedrivePerson.name
    // Add other technician fields here if any
  };

  return new Technician(mappedTechnician);
}
// const  Model  = require('./models/model');

// module.exports = { mapDeal };
// function mapDeal(pipedriveDeal) {
//   const mappedDeal = {
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   };

//   return new Model({
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   });
// }

// module.exports = mapDeal;

// module.exports = { technicians };
// function technicians(pipedriveDeal) {
//   const mappedDeal = {
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   };

//   return new Model({
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   });
// }

// module.exports = mapDeal;
