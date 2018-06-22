({
	"doInit" : function(component, event, helper) {
		var tableId = component.get("v.CustomData");
        helper.getTableColumns(component, tableId);
        helper.getTableRows(component, tableId);
	}
})