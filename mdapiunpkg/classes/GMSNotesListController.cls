public class GMSNotesListController {
    @AuraEnabled
    public static List<Memo__c> getNotes(Id parentId) {
        Schema.SObjectType result = parentId.getSobjectType();

        List<Object> notes = new List<Object> ();
		List<Encounter_NPC__c> children = new List<Encounter_NPC__c>();
		List<Object> childNotes = new List<Object>();
		Set<Id> childIds = new Set<Id>();

		List<Memo__c> finalNotes = new List<Memo__c>();
		Set<Id> noteParentIds = new Set<Id>();

		List<Encounter__c> eNotes = new List<Encounter__c>();
		List<Character__c> cNotes = new List<Character__c>();
		List<Account> aNotes = new List<Account>();

        if(result == Schema.Encounter__c.SObjectType) {
			for(Encounter__c e : [SELECT Id FROM Encounter__c WHERE Id = :parentId]) {
				noteParentIds.add(e.Id);
			}

			children = [SELECT Character__r.Id FROM Encounter_NPC__c WHERE Encounter__r.Id = :parentId];
			for( Encounter_NPC__c o : children) {
				noteParentIds.add(o.Character__c);
			}
			for(Character__c c : [SELECT Id FROM Character__c WHERE Id IN :childIds]) {
				noteParentIds.add(c.Id);
			}
			System.debug(noteParentIds);
        } else if(result == Schema.Account.SObjectType) {
			for(Account a : [SELECT Id FROM Account WHERE Id = :parentId]) {
				noteParentIds.add(a.Id);
			}
			System.debug(noteParentIds);
        }

		finalNotes = [SELECT Id, Name, Parent_Object_Type__c, Parent_Id__c FROM Memo__c WHERE Parent_Id__c IN :noteParentIds];

        return finalNotes;
    }
}