public class CampPCController {
    public ID CampaignId { get; set; }
    public List<Contact> CampContacts { get; set; }
    /*public List<NPC_old__c> CampPCs { get; set; }
    public void getPCs() {
        CampContacts = [SELECT Contact__r
                        FROM CampaignMember
                        WHERE CampaignMember.Campaign = :CampaignId];
        CampPCs = [SELECT ID, Name
                    FROM NPC_old__c
                    WHERE Active__c = true
                      AND Player__c IN :CampContacts];
    }*/
}