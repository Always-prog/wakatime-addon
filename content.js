function sendStartDate(rawRarams){
    const params = new URLSearchParams(rawRarams)
    if (params.has('start') && params.has('end')){
        chrome.runtime.sendMessage({type: "filter_date", data: {
            start: params.get('start'),
            end: params.get('end')
        }});
    }
     
}
sendStartDate(window.location.search)

let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
  if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;
      sendStartDate(window.location.search)
    }
});
const config = {subtree: true, childList: true};

// start listening to changes
observer.observe(document, config);