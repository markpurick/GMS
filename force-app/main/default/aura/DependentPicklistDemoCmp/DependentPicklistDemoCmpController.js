({
    handleAccountChange : function(component, event, helper) {

        // Get a reference to the dependent picklist
        var selectContact = component.find("contact");

        // Call the helper function to refresh the
        // dependent picklist, based on the new controlling value
        component.set("v.contactOptions",
            selectContact.optionsByControllingValue[event.target.value]);
    },
    handleInit : function(component, event, helper) {
        var self = this;  // safe reference

        // Enqueue the action to get a max of 200 contacts
        // from Salesforce, and configure the callback handler
        // to set the Contact picklist to be dependent
        // on the Account picklist, simultaneously enumerating
        // the Account picklist options
        var getContacts = component.get("c.getContacts");
        getContacts.setCallback(self, function(a) {
            var contacts = a.getReturnValue();  // Array<Object>

            // Construct the list of Account picklist options
            var accountOptions = [];

            // Construct the map of dependent Contact picklist
            // options, keyed on Account ID values
            var contactOptionsByAccountId = new Object();

            // Go through all of the returned Contact records
            // to enumerate the list of Account options and also
            // to build the map of dependent Contact options
            contacts.forEach(function(element, index, array) {
                var accountId = element.AccountId;

                // If the contact's Account is new to us
                if (contactOptionsByAccountId[accountId] === undefined) {

                    // Add the Account as an option for the
                    // Account picklist
                    var accountOption = new Object();
                    accountOption.value = element.AccountId;
                    accountOption.label = element.Account.Name;
                    accountOptions.push(accountOption);

                    // Construct an empty array to initialize
                    // the list of dependent Contact picklist options
                    contactOptionsByAccountId[accountId] = [];
                }

                // Add the Contact as an option under the appropriate
                // controlling Account ID value
                var contactOption = new Object();
                contactOption.value = element.Id;
                contactOption.label = element.Name;
                contactOptionsByAccountId[accountId].push(contactOption);
            });

            // Set the Account options
            component.set("v.accountOptions", accountOptions);

            // Attach the map of Contact options, keyed on
            // controlling Account ID values
            var selectContact = component.find("contact");
            selectContact.optionsByControllingValue = contactOptionsByAccountId;
        });
        $A.enqueueAction(getContacts);      
    }
})