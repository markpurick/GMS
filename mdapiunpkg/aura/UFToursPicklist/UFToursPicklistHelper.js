({
    loadData : function(component, event) {
        var todaysDate = new Date(Date.now());
        var monToday = todaysDate.getMonth();
        var dayToday = todaysDate.getDate();
        var yearToday = todaysDate.getFullYear();
        var hourToday = todaysDate.getHours();
        var monOpts = [
            { value: 0, label: "January", selected: "false"},
            { value: 1, label: "February", selected: "false"},
            { value: 2, label: "March", selected: "false"},
            { value: 3, label: "April", selected: "false"},
            { value: 4, label: "May", selected: "false"},
            { value: 5, label: "June", selected: "false"},
            { value: 6, label: "July", selected: "false"},
            { value: 7, label: "August", selected: "false"},
            { value: 8, label: "September", selected: "false"},
            { value: 9, label: "October", selected: "false"},
            { value: 10, label: "November", selected: "false"},
            { value: 11, label: "December", selected: "false"}
        ];
        for(var j = 0;j<monOpts.length;j++) {
            if(monOpts[j].value == monToday) {
                monOpts[j].selected = "true";
            }
        }
        var yearOpts = [
            { value: "2017", label: "2017", selected: "false" },
            { value: "2018", label: "2018", selected: "false" },
            { value: "2019", label: "2019", selected: "false" },
            { value: "2020", label: "2020", selected: "false" },
            { value: "2021", label: "2021", selected: "false" }
        ];
        for(var k = 0;k<yearOpts.length;k++) {
            if(yearOpts[k].value == yearToday) {
        		component.set("v.yearVar", yearOpts[k]);
            }
        }
        var dayOpts = [
            { value: "1", label: "1", selected: "false" },
            { value: "2", label: "2", selected: "false" },
            { value: "3", label: "3", selected: "false" },
            { value: "4", label: "4", selected: "false" },
            { value: "5", label: "5", selected: "false" },
            { value: "6", label: "6", selected: "false" },
            { value: "7", label: "7", selected: "false" },
            { value: "8", label: "8", selected: "false" },
            { value: "9", label: "9", selected: "false" },
            { value: "10", label: "10", selected: "false" },
            { value: "11", label: "11", selected: "false" },
            { value: "12", label: "12", selected: "false" },
            { value: "13", label: "13", selected: "false" },
            { value: "14", label: "14", selected: "false" },
            { value: "15", label: "15", selected: "false" },
            { value: "16", label: "16", selected: "false" },
            { value: "17", label: "17", selected: "false" },
            { value: "18", label: "18", selected: "false" },
            { value: "19", label: "19", selected: "false" },
            { value: "20", label: "20", selected: "false" },
            { value: "21", label: "21", selected: "false" },
            { value: "22", label: "22", selected: "false" },
            { value: "23", label: "23", selected: "false" },
            { value: "24", label: "24", selected: "false" },
            { value: "25", label: "25", selected: "false" },
            { value: "26", label: "26", selected: "false" },
            { value: "27", label: "27", selected: "false" },
            { value: "28", label: "28", selected: "false" },
            { value: "29", label: "29", selected: "false" },
            { value: "30", label: "30", selected: "false" },
            { value: "31", label: "31", selected: "false" }
        ];
        for(var l = 0;l<dayOpts.length;l++) {
            if(dayOpts[l].value == dayToday) {
                dayOpts[l].selected = "true";
            }
        }
        var timeOpts = [];
            /*{ value: "10", label: "10am", selected: "true" },
            { value: "14", label: "2pm" }
        ];*/
        component.set("v.monthOptions", monOpts);
        component.set("v.yearOptions", yearOpts);
        component.set("v.dayOptions", dayOpts);
        component.set("v.timeOptions", timeOpts);
        component.set("v.monthVar", monOpts[monToday]);
        component.set("v.dayVar", dayOpts[dayToday-1]);
    },
    loadMemberData : function(component, event) {
        //var vCID = component.find("UFTimePickList").get("v.value");
        var vCID = component.get("v.testTimeValue");
        if(vCID == null) {
            vCID = '';
        }
        console.log('campaign id : ' + vCID);
        var vMonth = component.get("v.monthVar.value");
        var vDay = component.get("v.dayVar.value");
        var vYear = component.get("v.yearVar.value");
        var tourMembers = component.get("c.getUFToursByType");
        var fixMonth = parseInt(vMonth) + 1;
        console.log(fixMonth + ' - ' + vDay + ' - ' + vYear + ' : ' + vCID);
        tourMembers.setParams({
            campMonth : fixMonth,
            campDay : vDay,
            campYear : vYear,
            campaignId : vCID
        });
        tourMembers.setCallback(this, function(action) {
            var toastEvent = $A.get("e.force:showToast");
            if (action.getState() == "SUCCESS") {
                console.log("Success!");
                var blankList = component.get("v.blankList");
                var memberList = component.get("v.memberList");
                var resultSet = action.getReturnValue();
                console.log(memberList);
                console.log(resultSet);
                component.set("v.blankList", resultSet);
                //component.set("v.memberList", resultSet);
                console.log("Made it passed setting the member list");
                //component.set("v.memberList", action.getReturnValue());
                //component.set("v.memberList", action.getReturnValue());
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                		console.log("ERROR!");
                        /*var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();*/
                    }
                } else {
                	console.log("ERROR!");
                    /*var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();*/
                }
            }
            else {
                console.log("ERROR!");
                /*var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();*/
            }
        });
        $A.enqueueAction(tourMembers);
    },
    loadCampaignNames : function(component, event) {
        var vMonth = component.get("v.monthVar.value");
        var iMonth = parseInt(vMonth);
        var vDay = component.get("v.dayVar.value");
        var vYear = component.get("v.yearVar.value");
        var tourCampaigns = component.get("c.getMatchingCampaignNames");
        tourCampaigns.setParams({
            selectedYear : vYear,
            selectedMonth : iMonth + 1,
            selectedDay : vDay
        });
        tourCampaigns.setCallback(this, function(action) {
            var toastEvent = $A.get("e.force:showToast");
            component.set("v.timeOptions", '');
            if (action.getState() == "SUCCESS") {
        		var campaignOpts = [];
                var queryResults = action.getReturnValue();
                var pageVar = component.get("v.timeOptions");
                for(var qr in queryResults) {
                    console.log(queryResults[qr]);
                    campaignOpts.push({ value: queryResults[qr].Id, label: queryResults[qr].Name});
                }
                console.log(campaignOpts);
                component.set("v.timeOptions", campaignOpts);
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(tourCampaigns);
    },
    onlyUnique : function(value, index, self) { 
    	return self.indexOf(value) === index;
	},
    loadStatuses : function(component, event) {
        var toastEvent = $A.get("e.force:showToast");
        var statusOptions = component.get("c.getMemberStatuses");
        statusOptions.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                component.set("v.statusOptions", action.getReturnValue());
                console.log("Success!");
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(statusOptions);
    },
    setMemberStatus : function(component, event) {
    },
    switchOpenClosed : function(component, event, depth) {
		//console.log('Test 4');
		//console.log(event);
		var cmpId = event.path[depth].id;
		//console.log(cmpId);
		//var cmpSrc = component.find(cmpId).getElement();
		//console.log(cmpSrc);
		if(cmpTarget == '' || cmpTarget == null) {}
		var cmpTarget = component.find(cmpId);
		//console.log("cmp target: " + cmpTarget);
		$A.util.toggleClass(cmpTarget, 'slds-is-open');
    }
})