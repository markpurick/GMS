({
	getTableColumns : function(component, tableId) {
		var columnAction = component.get("c.getTableColumns");
        columnAction.setParams({
            tableId : tableId
        });
        
        columnAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var results = response.getReturnValue();
                component.set("v.tableColumns", results);
                component.set("v.maxColumns", Math.max.apply(Math,results.map(function(o){return o.Order__c;})));
                //console.log(Math.max.apply(Math,results.map(function(o){return o.Order__c;})));
                //console.log(response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log('Incomplete...');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(columnAction);
	},
	getTableRows : function(component, tableId) {
		var rowAction = component.get("c.getTableRows");
        rowAction.setParams({
            tableId : tableId
        });
        
        rowAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.tableRows", response.getReturnValue());
                //console.log(response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log('Incomplete...');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(rowAction);
	}
})