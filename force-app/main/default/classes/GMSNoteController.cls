public class GMSNoteController  {
    @AuraEnabled
    public static void addNote(Memo__c newMemo) {
		String memoParent = newMemo.Parent_Id__c;
		Id parent = (Id)memoParent;
		Schema.sObjectType objType = parent.getSObjectType();
		String parentType = String.valueOf(objType);

		newMemo.Parent_Object_Type__c = parentType;

		insert newMemo;
	}
}