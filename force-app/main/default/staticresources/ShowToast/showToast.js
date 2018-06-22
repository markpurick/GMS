window._toast = (function() {
    var toastEvent = $A.get("e.force:showToast");

    return {
        showToast: function(type, title, message) {
            toastEvent.setParams({
                "type": type,
                "title": title,
                "message": message
            });
            toastEvent.fire();
        }
    }
});