public class ToursController {
    public Integer campMonth { get; set; }
    public Integer campDay { get; set; }
    public Integer campYear { get; set; }
    public String campaignId { get; set; }
    public List<CampaignMember> campaigns { get; set; }
    
    // Populate Country options in picklist for adding new Leads. Used in Add Lead Modal.
    public List<SelectOption> cntryOpts {
        get {
            List<SelectOption> options = new List<SelectOption>();
            
            Schema.DescribeFieldResult fieldResult = Lead.CountryCode.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            
            for (Schema.PicklistEntry f: ple) {
                options.add(new SelectOption(f.getLabel(), f.getValue()));
            }       
            return options;
        }
        set;
    }

    // Populate Admissions Interest options in picklist for adding new Leads. Used in Add Lead Modal.
    public List<SelectOption> admissionInterests {
        get {
            List<SelectOption> options = new List<SelectOption>();
            
            Schema.DescribeFieldResult fieldResult = Lead.Admission_Interest__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            
            for (Schema.PicklistEntry f: ple) {
                options.add(new SelectOption(f.getLabel(), f.getValue()));
            }       
            return options;
        }
        set;
    }
    
    // Populate Status options for Campaign Members in UFToursCampaign Members component.
    // Only show statuses applicable to UF Tours.
    public List<SelectOption> memberStatuses {
        get {
            List<SelectOption> options = new List<SelectOption>();
            
            Schema.DescribeFieldResult fieldResult = CampaignMember.Status.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            Set<String> tourStatuses = new Set<String>();
            
            tourStatuses.add('Attended');
            tourStatuses.add('No Show');
            tourStatuses.add('Cancelled');
            
            for( Schema.PicklistEntry f : ple)
            {
                if(tourStatuses.contains(f.getLabel())) {
                    options.add(new SelectOption(f.getLabel(), f.getValue(), false));
                } else {
                    options.add(new SelectOption(f.getLabel(), f.getValue(), true));
                }
            }     
        	return options;
        }
  		set;        
    }
    
    // Populate date filter picklist options for Month.
    public List<SelectOption> getMonths() {
        List<SelectOption> months = new List<SelectOption> ();
        
        months.add(new SelectOption('1','January'));
        months.add(new SelectOption('2','February'));
        months.add(new SelectOption('3','March'));
        months.add(new SelectOption('4','April'));
        months.add(new SelectOption('5','May'));
        months.add(new SelectOption('6','June'));
        
        months.add(new SelectOption('7','July'));
        months.add(new SelectOption('8','August'));
        months.add(new SelectOption('9','September'));
        months.add(new SelectOption('10','October'));
        months.add(new SelectOption('11','November'));
        months.add(new SelectOption('12','December'));
        
        system.debug(months);
        return months;
    }
    
    // Populate date filter picklist options for Day.
    public List<SelectOption> getDays() {
        List<SelectOption> days = new List<SelectOption> ();
        
        for(Integer d = 1; d < 32; d++) {
            days.add(new SelectOption(String.valueOf(d),String.valueOf(d)));
        }
        
        system.debug(days);
        return days;
    }
    
    // Populate date filter picklist options for Year.
    public List<SelectOption> getYears() {
        List<SelectOption> years = new List<SelectOption> ();
        
        for(Integer y = 2016; y < 2031; y++) {
            years.add(new SelectOption(String.valueOf(y),String.valueOf(y)));
        }
        
        system.debug(years);
        return years;
    }
    
    // Populate Campaign Name picklist based on date filter values.
    public List<SelectOption> getCampaignNames () {
        List<SelectOption> campaignNames = new List<SelectOption> ();        
        Date queryDate = Date.newInstance(campyear, campMonth, campDay);
        
        campaignNames.add(new SelectOption('','--Select Campaign--'));
        
        for (Campaign c : [SELECT Id, Name FROM Campaign WHERE DAY_ONLY(Campaign.UF_Event_Time__c) = :queryDate AND Campaign.Type = 'Campus Tour']) {
            campaignNames.add(new SelectOption(String.valueOf(c.Id),String.valueOf(c.Name)));
        }
        
        return campaignNames;
    }

    // Get members assigned to the campaigns either by Campaign ID or by Event Time
    public List<CampaignMember> getUFToursByType(Integer campMonth, Integer campDay, Integer campYear, String campaignId) {
        system.debug(campMonth + '-' + campDay + '-' + campYear + '  -  ' + campaignId);
        DATETIME queryDateTime = DATETIME.now();
        Integer intYear = Integer.valueOf(campYear);
        Integer intMonth = Integer.valueOf(campMonth);
        Integer intDay = Integer.valueOf(campDay);
                
        DATE queryDate = Date.newInstance(intYear, intMonth, intDay);
        
        if(campMonth == null || campDay == null || campYear == null) {
            queryDateTime = DATE.today(); 
            //system.debug('Here is the date: ' + queryDateTime);
        }
        else {
        	queryDateTime = DATE.newInstance(intYear, intMonth, intDay);   
            //system.debug('Here is the else date: ' + queryDateTime);
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
    
    public ToursController() {
        buildPage();
    }
    
    public void buildPage() {
        Date todaysDate = Date.today();
        campMonth = todaysDate.month();
        campDay = todaysDate.day();
        campYear = todaysDate.year();
        campaignId = '';
        
        cntryOpts = new List<SelectOption>();
        admissionInterests = new List<SelectOption>();
        memberStatuses = new List<SelectOption>();
        List<CampaignMember> campaigns = new List<CampaignMember>();
        
        getUFToursByType(campMonth, campDay, campYear, campaignId);
    }
    
    public PageReference refreshCampaigns() {
        getCampaignNames();
        return null;
    }
    
    public PageReference refreshMembers() {
        system.debug('In refresh Members');
        getUFToursByType(campMonth, campDay, campYear, campaignId);
        return null;
    }
    
    
}