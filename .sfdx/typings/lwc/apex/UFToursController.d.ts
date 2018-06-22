declare module "@apex/UFToursController.getMatchingCampaignNames" {
  export function getMatchingCampaignNames(param: {selectedYear: any, selectedMonth: any, selectedDay: any, selectedCampaign: any}): Promise<any>;
}
declare module "@apex/UFToursController.initiateLead" {
  export function initiateLead(): Promise<any>;
}
declare module "@apex/UFToursController.getStates" {
  export function getStates(): Promise<any>;
}
declare module "@apex/UFToursController.getCountries" {
  export function getCountries(): Promise<any>;
}
declare module "@apex/UFToursController.getAdmissionInterests" {
  export function getAdmissionInterests(): Promise<any>;
}
declare module "@apex/UFToursController.getUFToursByType" {
  export function getUFToursByType(param: {campMonth: any, campDay: any, campYear: any, campaignId: any}): Promise<any>;
}
declare module "@apex/UFToursController.getMemberStatuses" {
  export function getMemberStatuses(): Promise<any>;
}
declare module "@apex/UFToursController.getCampaignId" {
  export function getCampaignId(): Promise<any>;
}
declare module "@apex/UFToursController.addCampaignMember" {
  export function addCampaignMember(param: {pLead: any, pCampaignId: any, pNumAttending: any}): Promise<any>;
}
declare module "@apex/UFToursController.updateCampaignMember" {
  export function updateCampaignMember(param: {campaignMember: any}): Promise<any>;
}
