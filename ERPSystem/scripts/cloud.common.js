// Method to log Trace for AI and log4Net

function LogTrace(message, severityLevel)
{
     $(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Webservices///LoggerService.svc/LogTrace',
            dataType: "json", //Expected data format from server
            processdata: true,
            data: '{ "Category":"javascript", "Message":"' + message + '", "Level":"' + severityLevel + '" }',
            success: function (data) {
                console.log("Scuuceesfully addedd Log trace");
            },
            error: function (xhr, status, error) {
                var err = xhr.responseText;
                console.log("Failed addedd Log trace");
            }
        });

    });
}

// Method to log Error for AI and log4Net
function LogError(message, severityLevel)
{
    $(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Webservices///LoggerService.svc/LogException',
            dataType: "json", //Expected data format from server
            processdata: true,
            data: '{ "Category":"javascript", "Message":"' + message + '", "Level":"' + severityLevel + '" }',
            success: function (data) {
                console.log("Scuuceesfully addedd Exception");
            },
            error: function (xhr, status, error) {
                var err = xhr.responseText;
                console.log("Failed addedd Exception");
            }
        });

    });
}

// ApplicationInsight Event Tracking
function ApplicationInsightEventTrack(Category, Title, URL) {
                var data = "{" + "\"Category\": \"" + Category + "\", \"Title\": \"" + Title + "\",\"URL\": \"" + URL + "\"}";
                appInsights.trackEvent(Title, JSON.parse(data));
}

// AI Page Views Tracking

function ApplicationInsightPageViewTrack() {
    // default value of AI instrument key and deployment slot
    var deploymentSlot = "DEV";
    var aiInstrumentKey = "d60e0d26-081b-4de3-abd0-8aa27bffafbe";
    var docURL = document.URL.toLowerCase();
    if (docURL.indexOf('wa-scus-emp-ees-prod-dev.azurewebsites.net') >= 0 || docURL.indexOf('eesdev.myiliad.com') >= 0)
    {
       
        aiInstrumentKey = "c4b16b3c-ea6e-4d2f-b875-fac344b9d6c7";
        deploymentSlot = "DEV";
    }
    else if (docURL.indexOf('wa-scus-emp-ees-prod-qa.azurewebsites.net') >= 0 || docURL.indexOf('eesqa.myiliad.com') >= 0)
    {
        aiInstrumentKey = "0a640645-0ffb-493f-94f9-4468774b1cf1";
        deploymentSlot = "QA";

    }
    else if (docURL.indexOf('wa-scus-emp-ees-prod.azurewebsites.net') >= 0 || docURL.indexOf('ees.myiliad.com') >= 0)
    {
        aiInstrumentKey = "840ac2a5-1f66-417c-852c-fa8529c6f7c5";
        deploymentSlot = "PROD";

    }
 
    var appInsights = window.appInsights || function (config) {
        function i(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f; y.src = config.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(y); try { t.cookie = u.cookie } catch (p) { } for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;) i("track" + r.pop()); return i("set" + s), i("clear" + s), i(h + a), i(c + a), i(h + v), i(c + v), i("flush"), config.disableExceptionTracking || (r = "onerror", i("_" + r), f = e[r], e[r] = function (config, i, u, e, o) { var s = f && f(config, i, u, e, o); return s !== !0 && t["_" + r](config, i, u, e, o), s }), t
    }({
        instrumentationKey: aiInstrumentKey
    });

    window.appInsights = appInsights;
    // appInsights.trackPageView();
    var docTitle = document.title;
    
    var customProperties = "";
    customProperties = "{\"DeploymentSlot\":\"" + deploymentSlot + "\"}";
    appInsights.trackPageView(docTitle, docURL, JSON.parse(customProperties));

}

ApplicationInsightPageViewTrack();
//LogTrace("Test log trace from Javascript", "information");
//LogError("test error message from Javascript", "Warning");