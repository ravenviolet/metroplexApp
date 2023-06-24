function formatOutputArray(inputArray1, inputArray2) {
    let outputArray = [];
  
    for (let i = 0; i < inputArray1.length; i++) {
      // Remove quotes and split at the first colon to get the key
      let key = inputArray1[i].split(":")[0].replace(/"/g, '');
  
      // Split the second input at the colon and take the first part as label
      let label = inputArray2[i].split(":")[0];
  
      // Push the formatted string to the output array
      outputArray.push(`${label}: pipedriveDeal['${key}'] ?? ''`);
    }
  
    return outputArray;
  }

  // let inputArray1 = ['"52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_id": 228','"87bccaa66e94e9fb339a2adc343333fa900fbe27": "Revisiting to capture Exterior 360s as noted with red circles on FP below:\nhttps://www.dropbox.com/s/nr9dvu8nswqqls7/PNC%20Bank%20-%20River%20Oaks%20FP.png?dl=0\n\nWhen reuploading - please make COPY and then delete scan points relevant to the Wealth Mgmt side of this scan. The pink dot on the floorplan above indicates the start of Wealth Mgmt. \n\nUpload MP\nbooking@metroplex360.com    Booking@M360\nAccount: M3"'];
  let inputArray1 = ['"52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_id": 228','"87bccaa66e94e9fb339a2adc343333fa900fbe27": "Revisiting to capture Exterior 360s as noted with red circles on FP below:\nhttps://www.dropbox.com/s/nr9dvu8nswqqls7/PNC%20Bank%20-%20River%20Oaks%20FP.png?dl=0\n\nWhen reuploading - please make COPY and then delete scan points relevant to the Wealth Mgmt side of this scan. The pink dot on the floorplan above indicates the start of Wealth Mgmt. \n\nUpload MP\nbooking@metroplex360.com    Booking@M360\nAccount: M3"','"40fc635f90f19d5c6a369ffd40a5c86ecd1b90b9": 0','"723580ee6b265282f6fee4b98c51fce6a89d464e": 0','"487d7e7c8a77fe47e49a250d198070be8641e1b5": null','"ab47790bf8f7ad264b7a5bc7307cd48fd612047f": "26"','"cf7c9522cc73f9c120e4b1d770cf62aef14ffdf6": "27"','"5d961f699a8722b3ed69ab165d1c7a477f598ce8": null','"719c75a4889b84b952c802ac2858cdaa31656c79": ""','"d396fa684a338b5908fa62a40bbcee2c48a1908e": "https://my.matterport.com/show/?m=pdZnCEtNYRb"','"f079d444d4137a200d1d71835293d4207aefa103": null','"d9b82e3c321ec465052d3c3a88c6a54a4d2c7f58": null','"8f2dfa63e5cf2f9faaf95e494dd8f484c9fe98db": null','"39589ccfd5ffcd561e249e1fa452bafd3d21d93a": 0','"f8cb375b3aaa58fdf584b1ae6216d8be0b3d92f0": null','"b99a1bae6c53cc5512d0d26c9b00ce46c90276d6": null','"f2f9dfc79ba86e100f3230b218e6e78a6ade2929": null','"29e4737bb43941cee199691a6600c8b96c995777": "s"','"9dc2d655930ee0d4254d7bccd853dd17c760369b": null','"aad2bd7ba19899db4dfc6c7f895866efde260713": 0','"63abc182d5f9254b5a59e619ff288cc409211980": null','"0ccf2ebde552fce2e9deba49e668858af6c09a59": null','"b05583e6adfaadc57786e6a0b198c01091166a9e": null'];
  let inputArray2 = ['Timezone ID: 222','Tech Notes, access, POC: f','Tech Payout: $0','Tech Travel: $0','Tech Payout Date: -','Event Status: Confirmed', 
    'Calendar Actions: Action Completed','Assets: -','Deliverables (dropbox link): -','3D Tour URL: https://my.matterport.comshow/?m=pdZnCEtNYRb','Matterport Archive Date: -','Camera Type: -','Photo Editing: -','Advanced Photo Edit: $0','Accounts: -','Invoice Number: -','Invoice Date: -','Invoice URL: -','Part Paid: -','Other Payout: $0','Other Payout note: -','Do Not Edit: -','Previously Assigned Technician: -'];
  
  let outputArray = formatOutputArray(inputArray1, inputArray2);
  console.log(outputArray); 
