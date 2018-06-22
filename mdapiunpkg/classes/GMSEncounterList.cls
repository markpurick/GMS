public class GMSEncounterList  {
    @AuraEnabled
    public static List<Encounter__c> getBaseEncountersByRegion(Id regionId) {
		RecordType recTypeAPIName = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'Base' AND SobjectType = 'Encounter__c' LIMIT 1]; 
	
		List<Encounter__c> encounters = [SELECT Id FROM Encounter__c WHERE Region__c = :regionId];
        
		return encounters;
	}
}