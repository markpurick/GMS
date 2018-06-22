public class GMSEncounterCharList {
    
    @AuraEnabled
    public static List<Character__c> getEncounterCharacterList(Id encounterId) {
        List<Character__c> charList = new List<Character__c>();
        List<Encounter_NPC__c> charIdList = [SELECT Character__r.Id FROM Encounter_NPC__c WHERE Encounter__r.Id=:encounterId ORDER BY Character__r.Initiative_Order__c]; 
        
        if(charIdList != null) {
            for(Encounter_NPC__c e : charIdList) {
                Character__c newChar = new Character__c();
                newChar.Id = e.Character__r.Id;
                if(newChar.Id != null) {
                    charList.add(newChar);
                }
            }
        }
        
        return charList;
    }
}