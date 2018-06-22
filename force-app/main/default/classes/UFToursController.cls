public with sharing class UFToursController {
    public class SelectOption {
        public SelectOption(String value, String label) {
            this.value = value;
            this.label = label;
            this.disabled = false;
            this.escapeItem = false;
        }
    
        public SelectOption(String value, String label, Boolean isDisabled) {
            this.value = value;
            this.label = label;
            this.disabled = isDisabled;
            this.escapeItem = false;
        }
    
        @AuraEnabled
        public String label { get;set; }
        @AuraEnabled
        public String value { get;set; }
        @AuraEnabled
        public Boolean disabled { get;set; }
        @AuraEnabled
        public Boolean escapeItem { get;set; }
    
    }
    @AuraEnabled
    public static List<Campaign> getMatchingCampaignNames(Integer selectedYear, Integer selectedMonth, Integer selectedDay, String selectedCampaign) {
        Integer intYear = Integer.valueOf(selectedYear);
        Integer intMonth = Integer.valueOf(selectedMonth);
        Integer intDay = Integer.valueOf(selectedDay);
        Date queryDate = Date.newInstance(intYear, intMonth, intDay);
        List<Campaign> returnList =  [SELECT Id, Name 
                                        FROM Campaign 
                                        WHERE DAY_ONLY(Campaign.UF_Event_Time__c) = :queryDate 
                                          AND Campaign.Type = 'Campus Tour'
                                        ORDER BY Campaign.UF_Event_Time__c];
        system.debug('Campaigns...');
        system.debug(returnList);
        return returnList;
    }
    @AuraEnabled
    public static Lead initiateLead() {
        Lead newLead = new Lead();
        newLead.CountryCode = 'United States';
        return newLead;
    }
    @AuraEnabled
    public static List<SelectOption> getStates() {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = Lead.StateCode.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
    
        for (Schema.PicklistEntry pe : SObjectType.Lead.fields.StateCode.getPicklistValues()) {
            if (pe.getLabel() == 'US') {
                options.add(new SelectOption(pe.getValue(), pe.getLabel()));
            }
        }
        
        return options;
    }
    @AuraEnabled
    public static List<SelectOption> getCountries() {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = Lead.CountryCode.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
    
        for (Schema.PicklistEntry f: ple) {
            options.add(new SelectOption(f.getLabel(), f.getValue()));
        }       
        
        return options;
    }
    @AuraEnabled
    public static List<SelectOption> getAdmissionInterests() {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = Lead.Admission_Interest__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
    
        for (Schema.PicklistEntry f: ple) {
            options.add(new SelectOption(f.getLabel(), f.getValue()));
        }       
        
        return options;
    }
    @AuraEnabled
    public static List<CampaignMember> getUFToursByType(Integer campMonth, Integer campDay, Integer campYear, String campaignId) {
        system.debug(campMonth + '-' + campDay + '-' + campYear + '  -  ' + campaignId);
        DATETIME queryDateTime = DATETIME.now();
        Integer intYear = Integer.valueOf(campYear);
        Integer intMonth = Integer.valueOf(campMonth);
        Integer intDay = Integer.valueOf(campDay);

        List<CampaignMember> campaigns = new List<CampaignMember>();
        DATE queryDate = Date.newInstance(intYear, intMonth, intDay);
        
        if(campMonth == null || campDay == null || campYear == null) {
            queryDateTime = DATE.today(); 
        }
        else {
        	queryDateTime = DATE.newInstance(intYear, intMonth, intDay);   
        }
        if(campaignId == '' || campaignId == null) {
            campaigns = [SELECT FirstName, LastName, Status, UF_Total_Attended__c,
                        UF_Total_in_Party_Number__c, City, State, Comments__c,
                        Lead.Entry_Term__c, Lead.Entry_Year__c, Lead.High_School_Graduation_Year__c, 
                        Lead.Major_Interest_1__c, Lead.Major_Interest_2__c, Lead.Major_Interest_3__c, 
                        Lead.Admission_Interest__c,
                        Campaign.Id, Campaign.Name, Campaign.UF_Event_Time__c, Campaign.UF_Event_End_Time__c
                   FROM CampaignMember 
                   WHERE DAY_ONLY(Campaign.UF_Event_Time__c) = :queryDate
                     AND Campaign.Type = 'Campus Tour'
                   ORDER BY LastName, FirstName
                ];
        } else {
            ID idCamp = campaignId;
            system.debug(idCamp);
            campaigns = [SELECT FirstName, LastName, Status, UF_Total_Attended__c,
                        UF_Total_in_Party_Number__c, City, State, Comments__c,
                        Lead.Entry_Term__c, Lead.Entry_Year__c, Lead.High_School_Graduation_Year__c, 
                        Lead.Major_Interest_1__c, Lead.Major_Interest_2__c, Lead.Major_Interest_3__c, 
                        Lead.Admission_Interest__c,
                        Campaign.Id, Campaign.Name, Campaign.UF_Event_Time__c, Campaign.UF_Event_End_Time__c
                   FROM CampaignMember 
                   WHERE Campaign.ID = :idCamp
                   ORDER BY LastName, FirstName
                ];
        }
        return campaigns;
    }
    @AuraEnabled
    public static List<SelectOption> getMemberStatuses() {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = CampaignMember.Status.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        Set<String> tourStatuses = new Set<String>();
        tourStatuses.add('Attended');
        tourStatuses.add('No Show');
        tourStatuses.add('Cancelled');
        options.add(new SelectOption('Select Status', ''));
        
        for( Schema.PicklistEntry f : ple)
        {
            if(tourStatuses.contains(f.getLabel()) || (f.getLabel() == '')) {
            	options.add(new SelectOption(f.getLabel(), f.getValue(), false));
                system.debug(f.getValue() + ' is available');
            } else {
            	options.add(new SelectOption(f.getLabel(), f.getValue(), true));
                system.debug(f.getValue() + ' is disabled');
            }
        }       
        
        return options;
    }
    @AuraEnabled
    public static Id getCampaignId() {
        String idFromStr = '70141000000bblW';
        Id finalId = Id.valueOf(idFromStr);
		Id idForCampaign = [SELECT Id FROM Campaign WHERE Id = :finalId].ID;     
        return idForCampaign;
    }    
    @AuraEnabled
    public static void addCampaignMember(Lead pLead, String pCampaignId, Integer pNumAttending) {        
        Lead newLead = new Lead();
        newLead.FirstName = pLead.FirstName;
        newLead.LastName = pLead.LastName;
        newLead.Company = pLead.LastName + ' Administrative Account';
        newLead.Email = pLead.Email;
        newLead.Admission_Interest__c = pLead.Admission_Interest__c;
        newLead.StateCode = pLead.StateCode;
        newLead.City = pLead.City;
        
        try {
        	insert newLead;
            system.debug(newLead);
        } catch(Exception e) {
            system.debug(e);
        }
        
        CampaignMember member = new CampaignMember();
        member.CampaignId = pCampaignId;
        member.LeadId = newLead.Id;
        member.UF_Total_Attended__c = Integer.valueOf(pNumAttending);
        member.Status = 'Attended';
        
        try {
        	insert member;
            system.debug(member);
        } catch(Exception e) {
            system.debug(e);
        }
    }
    @AuraEnabled
    public static void updateCampaignMember(CampaignMember campaignMember) {
        try {
        	update campaignMember;
            system.debug(campaignMember);
        } catch(Exception e) {
            system.debug(e);
        }
    }
}