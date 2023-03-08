chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "filter_date"){
        const {start, end} = request.data;
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    "id" : 1,
                    "priority": 1,
                    "action" : {
                        "type": "redirect",
                        "redirect": {
                        "transform": {
                            "queryTransform": {
                            "removeParams": ["paywalled"],
                            "addOrReplaceParams": [
                                {
                                "key": "start",
                                "value": start
                                },
                                {
                                    "key": "end",
                                    "value": end
                                }
                            ]
                            }
                        }
                        }
                    },
                    "condition" : {
                        "urlFilter": "https://wakatime.com/api/v1/users/current/*",
                        "resourceTypes": ["xmlhttprequest"]
                    }
                }
            ],
            removeRuleIds: [1]
        });
    }
});
