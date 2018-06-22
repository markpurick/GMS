global class GMSCustomDataDesignResourcePickList extends VisualEditor.DynamicPickList {
   global override VisualEditor.DataRow getDefaultValue(){
       VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('Spell Damage','a0G4100000kupTMEAY');
       return defaultValue;
   }
   global override VisualEditor.DynamicPickListRows getValues() {   
       VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
       for(Custom_Data__c cd : [SELECT Id, Name FROM Custom_Data__c WHERE Type__c = 'Table']) {
           myValues.addRow(new VisualEditor.DataRow(cd.Name, cd.Id));
       }
       return myValues;
   }
}