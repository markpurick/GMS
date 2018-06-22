public class GMSSubRegionsByRegion  {
    @AuraEnabled
    public static List<Account> getSubRegionsByRegion(Id regionId) {
		List<Account> subregions = [SELECT Id FROM Account WHERE ParentId = :regionId];
        
		return subregions;
	}
}