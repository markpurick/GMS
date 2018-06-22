public with sharing class GMSCustomDataCtrl {
	@AuraEnabled
    public static List<Custom_Data__c> getTables() {
        return [SELECT Id, Name FROM Custom_Data__c WHERE Type__c = 'Table'];
    }
	@AuraEnabled
    public static List<Custom_Data__c> getTableColumns(Id tableId) {
        return [SELECT Id, Name, Order__c FROM Custom_Data__c WHERE Parent_Table__c = :tableId AND Type__c = 'Column' ORDER BY Order__c];
    }
	@AuraEnabled
    public static List<Custom_Data__c> getTableRows(Id tableId) {
        return [SELECT Id, Name, Row_Number__c, Order__c FROM Custom_Data__c WHERE Parent_Table__c = :tableId AND Type__c = 'Record' ORDER BY Row_Number__c, Order__c];
    }
}