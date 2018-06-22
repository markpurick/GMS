public class GMSCharacterByRegion  {
    @AuraEnabled
    public static List<Character__c> getCharactersByRegion(Id regionId) {
		RecordType recTypeAPIName = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'Base' AND SobjectType = 'Character__c' LIMIT 1]; 
	
		List<Character__c> characters = [SELECT Id FROM Character__c WHERE Region__c = :regionId AND PcNpc__c = 'NPC'];
        
		return characters;
	}
}