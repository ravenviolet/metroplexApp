const  { Job, Technician } = require('./models/model');

module.exports = { mapDeals, mapDeal, mapTechnician };

function mapDeals(pipedriveDeal) {
  let technicianData = pipedriveDeal['0c83313fba78b12676463126f74527552763ec8e'];

  // Default Technician Fields
  let technicianFields = {
    active_flag: false,
    name: '',
    email: {
        value: null,
        primary: null,
    },
    phone: {
        value: null,
        primary: null,
    },
    owner_id: null,
    value: null,
  };

  // If technicianData is not null, map its values
  if(technicianData) {
    technicianFields = {
      active_flag: technicianData.active_flag ?? false,
      name: technicianData.name ?? '',
      email: {
          value: technicianData.email?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.email?.primary ?? null,  // Added optional chaining (?)
      },
      phone: {
          value: technicianData.phone?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.phone?.primary ?? null,  // Added optional chaining (?)
      },
      owner_id: technicianData.owner_id ?? null,
      value: technicianData.value ?? null,
    };
  }
return {
  // Map Pipedrive deal fields to Mongoose Job model fields here
  
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
    person_id: pipedriveDeal.person_id?.id ?? '',
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
    technician_fields: technicianFields,
    timezone_id: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_id'] ?? '',
    event_date: pipedriveDeal['a5ed135fe1d0c912d151685da4f86620106e074f'] ?? '',
    event_start_time: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f'] ?? '',  
    tech_notes: pipedriveDeal['87bccaa66e94e9fb339a2adc343333fa900fbe27'] ?? '',
    tech_payout: pipedriveDeal['40fc635f90f19d5c6a369ffd40a5c86ecd1b90b9'] ?? '',
    tech_travel: pipedriveDeal['723580ee6b265282f6fee4b98c51fce6a89d464e'] ?? '',
    tech_payout_date: pipedriveDeal['487d7e7c8a77fe47e49a250d198070be8641e1b5'] ?? '',
    event_status: pipedriveDeal['ab47790bf8f7ad264b7a5bc7307cd48fd612047f'] ?? '',
    calendar_actions: pipedriveDeal['cf7c9522cc73f9c120e4b1d770cf62aef14ffdf6'] ?? '',
    assets: pipedriveDeal['5d961f699a8722b3ed69ab165d1c7a477f598ce8'] ?? '',
    dropbox_deliverable: pipedriveDeal['719c75a4889b84b952c802ac2858cdaa31656c79'] ?? '',
    threed_tour_url: pipedriveDeal['d396fa684a338b5908fa62a40bbcee2c48a1908e'] ?? '',
    matterport_archive_date: pipedriveDeal['f079d444d4137a200d1d71835293d4207aefa103'] ?? '',
    camera_type: pipedriveDeal['d9b82e3c321ec465052d3c3a88c6a54a4d2c7f58'] ?? '',
    photo_editing: pipedriveDeal['8f2dfa63e5cf2f9faaf95e494dd8f484c9fe98db'] ?? '',
    advanced_photo_edit: pipedriveDeal['39589ccfd5ffcd561e249e1fa452bafd3d21d93a'] ?? '',
    accounts: pipedriveDeal['f8cb375b3aaa58fdf584b1ae6216d8be0b3d92f0'] ?? '',
    invoice_number: pipedriveDeal['b99a1bae6c53cc5512d0d26c9b00ce46c90276d6'] ?? '',
    invoice_date: pipedriveDeal['f2f9dfc79ba86e100f3230b218e6e78a6ade2929'] ?? '',
    invoice_url: pipedriveDeal['29e4737bb43941cee199691a6600c8b96c995777'] ?? '',
    part_paid: pipedriveDeal['9dc2d655930ee0d4254d7bccd853dd17c760369b'] ?? '',
    other_payout: pipedriveDeal['aad2bd7ba19899db4dfc6c7f895866efde260713'] ?? '',
    other_payout_note: pipedriveDeal['63abc182d5f9254b5a59e619ff288cc409211980'] ?? '',
    do_not_edit: pipedriveDeal['0ccf2ebde552fce2e9deba49e668858af6c09a59'] ?? '',
    prev_assigned_tech: pipedriveDeal['b05583e6adfaadc57786e6a0b198c01091166a9e']?.name ?? ''
  };
}
 
function mapDeal(pipedriveDeal) {

  let technicianData = pipedriveDeal['0c83313fba78b12676463126f74527552763ec8e'];

  // Default Technician Fields
  let technicianFields = {
    active_flag: false,
    name: '',
    email: {
        value: null,
        primary: null,
    },
    phone: {
        value: null,
        primary: null,
    },
    owner_id: null,
    value: null,
  };

  // If technicianData is not null, map its values
  if(technicianData) {
    technicianFields = {
      active_flag: technicianData.active_flag ?? false,
      name: technicianData.name ?? '',
      email: {
        // DealPersonDataEmail: {
          value: technicianData.email?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.email?.primary ?? null,  // Added optional chaining (?)
      // } 
    },
      phone: {
          value: technicianData.phone?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.phone?.primary ?? null,  // Added optional chaining (?)
      },
      owner_id: technicianData.owner_id ?? null,
      value: technicianData.value ?? null,
    };
  }
  // let dealIDCheck = pipedriveDeal[deal_id];
  // if(dealIDCheck) {
  //   for(i=0;i++, i<dealIDCheck.length){}
  // };

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
    technician_fields: technicianFields,
    timezone_id: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_id'] ?? '',
    event_date: pipedriveDeal['a5ed135fe1d0c912d151685da4f86620106e074f'] ?? '',
    event_start_time: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f'] ?? '',  
    tech_notes: pipedriveDeal['87bccaa66e94e9fb339a2adc343333fa900fbe27'] ?? '',
    tech_payout: pipedriveDeal['40fc635f90f19d5c6a369ffd40a5c86ecd1b90b9'] ?? '',
    tech_travel: pipedriveDeal['723580ee6b265282f6fee4b98c51fce6a89d464e'] ?? '',
    tech_payout_date: pipedriveDeal['487d7e7c8a77fe47e49a250d198070be8641e1b5'] ?? '',
    event_status: pipedriveDeal['ab47790bf8f7ad264b7a5bc7307cd48fd612047f'] ?? '',
    calendar_actions: pipedriveDeal['cf7c9522cc73f9c120e4b1d770cf62aef14ffdf6'] ?? '',
    assets: pipedriveDeal['5d961f699a8722b3ed69ab165d1c7a477f598ce8'] ?? '',
    dropbox_deliverable: pipedriveDeal['719c75a4889b84b952c802ac2858cdaa31656c79'] ?? '',
    threed_tour_url: pipedriveDeal['d396fa684a338b5908fa62a40bbcee2c48a1908e'] ?? '',
    matterport_archive_date: pipedriveDeal['f079d444d4137a200d1d71835293d4207aefa103'] ?? '',
    camera_type: pipedriveDeal['d9b82e3c321ec465052d3c3a88c6a54a4d2c7f58'] ?? '',
    photo_editing: pipedriveDeal['8f2dfa63e5cf2f9faaf95e494dd8f484c9fe98db'] ?? '',
    advanced_photo_edit: pipedriveDeal['39589ccfd5ffcd561e249e1fa452bafd3d21d93a'] ?? '',
    accounts: pipedriveDeal['f8cb375b3aaa58fdf584b1ae6216d8be0b3d92f0'] ?? '',
    invoice_number: pipedriveDeal['b99a1bae6c53cc5512d0d26c9b00ce46c90276d6'] ?? '',
    invoice_date: pipedriveDeal['f2f9dfc79ba86e100f3230b218e6e78a6ade2929'] ?? '',
    invoice_url: pipedriveDeal['29e4737bb43941cee199691a6600c8b96c995777'] ?? '',
    part_paid: pipedriveDeal['9dc2d655930ee0d4254d7bccd853dd17c760369b'] ?? '',
    other_payout: pipedriveDeal['aad2bd7ba19899db4dfc6c7f895866efde260713'] ?? '',
    other_payout_note: pipedriveDeal['63abc182d5f9254b5a59e619ff288cc409211980'] ?? '',
    do_not_edit: pipedriveDeal['0ccf2ebde552fce2e9deba49e668858af6c09a59'] ?? '',
    prev_assigned_tech: pipedriveDeal['b05583e6adfaadc57786e6a0b198c01091166a9e'] ?? ''
    
  };

  return new Job(mappedDeal);
}

function mapTechnician(pipedriveDeal) {
  let technicianData = pipedriveDeal['0c83313fba78b12676463126f74527552763ec8e'];

  // Default Technician Fields
  let technicianFields = {
    active_flag: false,
    name: '',
    email: {
        value: null,
        primary: null,
    },
    phone: {
        value: null,
        primary: null,
    },
    owner_id: null,
    value: null,
  };

  // If technicianData is not null, map its values
  if(technicianData) {
    technicianFields = {
      active_flag: technicianData.active_flag ?? false,
      name: technicianData.name ?? '',
      email: {
          value: technicianData.email?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.email?.primary ?? null,  // Added optional chaining (?)
      },
      phone: {
          value: technicianData.phone?.value ?? null,  // Added optional chaining (?)
          primary: technicianData.phone?.primary ?? null,  // Added optional chaining (?)
      },
      owner_id: technicianData.owner_id ?? null,
      value: technicianData.value ?? null,
    };
  }

  const mappedTech = {
    technician_fields: technicianFields
  };
  // };

  return new Technician(mappedTech);
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
