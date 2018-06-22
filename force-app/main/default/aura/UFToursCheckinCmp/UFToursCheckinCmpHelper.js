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
                yearOpts[k].selected = "true";
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
        var timeOpts = [
            { value: "10", label: "Tour - 10am", selected: "true" },
            { value: "14", label: "Tour - 2pm" }
        ];
        component.set("v.monthOptions", monOpts);
        component.set("v.yearOptions", yearOpts);
        component.set("v.dayOptions", dayOpts);
        component.set("v.timeOptions", timeOpts);
        component.set("v.monthVar", monToday + 1);
        component.set("v.yearVar", yearToday);
        component.set("v.dayVar", dayToday);
        component.set("v.timeVar", hourToday);
    },
    loadMemberData : function(component, event) {
        var vMonth = component.get("v.monthVar");
        var vDay = component.get("v.dayVar");
        var vYear = component.get("v.yearVar");
        var vTime = component.get("v.timeVar");
        var tourMembers = component.get("c.getUFToursByType");
        tourMembers.setParams({
            campMonth : vMonth,
            campDay : vDay,
            campYear : vYear,
            campHour : vTime,
            campMinute : 0
        })
        tourMembers.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                component.set("v.memberList", action.getReturnValue());
                console.log("Success!");
                console.log(action.getReturnValue());
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            else {
                console.log(action.getState());
            }
        });
        $A.enqueueAction(tourMembers);
    },
    onlyUnique : function(value, index, self) { 
    	return self.indexOf(value) === index;
	},
    loadStatuses : function(component, event) {
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
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            else {
                console.log(action.getState());
            }
        });
        $A.enqueueAction(statusOptions);
    },
    setMemberStatus : function(component, event) {
    }
})