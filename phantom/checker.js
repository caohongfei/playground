//By Hongfei Cao on 5/19/2015
//This script will discover the changes of the specific part of a specific page on the internet and notify you about it
//For example, it can detect the price change of a specific product on gnc.com, thus you won't miss a promotion

String.prototype.format = function() {
    var str = this;
    var lastArg = arguments[arguments.length - 1];
    var f = (typeof lastArg === "function") ? lastArg : null;
    var lastIndexToReplace = (f ? arguments.length - 2 : arguments.length - 1);
    for (var i = lastIndexToReplace; i >= 0; i --) {
        var arg = arguments[i];
        if (typeof arg === "object")
            Object.keys(arg).forEach(function(para) {
                str = str.replace(para, f ? f(arg[para]) : arg[para]);
            });
        else {
            arg = "" + arg; //toString()
            str = str.replace("$" + (i + 1), f ? f(arg) : arg);
        }
    }
    return str;
};

//Repeat execution of a function with 'interval' indefinitely.
//It differs from setInterval() in that it will schedule next execution only after the current job is completed.
//Instead, setInterval() will just trigger the execution periodically
Function.prototype.repeat = function (interval) {
    var __method = this, args = Array.prototype.slice.call(arguments, 1);
    function f() {
        __method.apply(__method, args);
        setTimeout(f, interval);
    }
    f();
};

Function.prototype.wait = function (interval, maximum, runAtOnce) {
    //__method will be called repeatedly at "interval" until it return true or maximum is reached
    var __method = this, args = Array.prototype.slice.call(arguments, 3); //3 is the number of wait() itself
    var start = new Date().getTime();
    var job = function () {
        var done = __method.apply(__method, args);
        if (done !== true && (new Date().getTime() - start <= maximum)) {
            window.setTimeout(job, interval);
        }
    };
    if (runAtOnce) {
        job();
    }
    else {
        window.setTimeout(job, interval);
    }
};

//A variation from phantomjs' version of wartFor - the onReady() call will receive a parameter about the result of testFx()
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                clearInterval(interval); //< Stop this interval
                onReady(condition);      //call the completion callback with the checking result
            }
        }, 250); //< repeat check every 250ms
}

function padding(num) {
    return num < 10 ? "0" + num : String(num);
}

function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + padding(monthIndex + 1) + "-" + padding(day) + " " + padding(date.getHours()) + ":" + padding(date.getMinutes()) + ":" + padding(date.getSeconds());
}

var configurations = [
    {
        identifier: 1,
        name: "GNC三倍鱼油",
        url: "http://www.gnc.com/GNC-Triple-Strength-Fish-Oil-1500/product.jsp?productId=12643679",
        selector: ".product-price.product-sprite .now, .product-promos.product-sprite",
        timeout: 40,    //seconds
        loadImages: false,
        alreadyHasJQ: true,
        useProxy: true,
        interval: 30    //minutes
    },
    {
        identifier: 2,
        name: "老山冻干粉",
        url: "http://detail.tmall.com/item.htm?spm=a1z10.1-b.w8171270-9438708950.55.zZhz6k&id=14943725766",
        selector: ".tm-promo-price .tm-price, .tm-shopPromotion-title.tm-gold",
        timeout: 20,
        loadImages: false,
        alreadyHasJQ: false,
        useProxy: false,
        interval: 30    //minutes
    },
    {
        identifier: 3,
        name: "上海天气",
        url: "http://www.weather.com.cn/weather/101020100.shtml",
        selector: "#7d [data-dn=7d1], #7d [data-dn=7d2]",
        timeout: 20,
        loadImages: false,
        alreadyHasJQ: true,
        useProxy: false,
        interval: 25    //minutes
    }
];

var tasks = [];

var records = [];

function addRecord(result) {
    records.push(result);
    var lastRecord;
    for (var i = records.length - 2; i >= 0; i--) {
        if (records[i].identifier === result.identifier) {
            lastRecord = records[i];
            break;
        }
    }
    if (!lastRecord || lastRecord.text !== result.text) {
        var process = require("child_process");
        var spawn = process.spawn;
        spawn("osascript", ["-e", 'tell app "System Events" to display dialog "$1 changed from\n\n$2\n\nto\n\n$3"'.format(result.name, lastRecord ? lastRecord.text : "EMPTY", result.text)]);
    }
}

function checkOneConfiguration(task) {
    var config = task.configuration;
    console.log(formatDate(new Date()) + ": Check " + config.name);
    if (config.useProxy) {
        phantom.setProxy("localhost", "1080", "socks5");
    }
    else {
        phantom.setProxy("");
    }
    var page = require('webpage').create();
    page.settings.loadImages = true;    //to avoid memory not releasing issue, images must be loaded
    page.settings.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36";
    //time out checking
    var isFinished = false; //success and fail are both "finished"
    var result = {
        identifier: config.identifier,
        name: config.name,
        timedOut: false,
        emptyText: false,
        text: ""
    };
    var timeout = setTimeout(function() {
        if (!isFinished) {
            console.log("Checking " + config.name + " timed out, stop it and see what we get.");
            result.timedOut = true;
            page.stop();
        }
    }, config.timeout * 1000);

    //page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    //};

    page.onError = function(msg, trace) {
        //var msgStack = ['ERROR: ' + msg];
        //if (trace && trace.length) {
        //    msgStack.push('TRACE:');
        //    trace.forEach(function(t) {
        //        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        //    });
        //}
        ////uncomment to log into the console
        //console.error(msgStack.join('\n'));
    };

    page.open(config.url, function(status) {
        //console.log(status);
        //console.log('Content: ' + page.content);
        clearTimeout(timeout);
        isFinished = true;
        var injectSuccess;
        if (!config.alreadyHasJQ) {
            injectSuccess = !!page.injectJs("jquery.min.js");
        }
        else {
            injectSuccess = true;
        }
        if (injectSuccess) {
            waitFor(function() {
                return page.evaluate(function(config) {
                    return !!jQuery(config.selector).text();
                }, config);
            }, function(criteriaMet) {
                if (criteriaMet) {
                    result.text = page.evaluate(function(config) {
                        return jQuery(config.selector).text();
                    }, config);
                } else {
                    result.text = "";
                    result.emptyText = true;
                }
                end();
            }, 20 * 1000);
        } else {
            result.text = "Inject failure";
            end();
        }

        function end() {
            result.text = result.text.replace(/[\t]+/g, "").replace(/[\r\n]+/g, "\n").trim();
            page.render(config.name + ".png");
            addRecord(result);
            var intervalToNextTry = result.emptyText ? Math.min(5, config.interval) : config.interval;  //If this try failed to get any text, try it sooner
            setTimeout(function() {
                createTask(config);
            }, intervalToNextTry * 60 * 1000);
            task.completed = true;
            console.log((result.text ? result.text : "'EMPTY'") + "\n");
            //the following two statements are to avoid huge memory consumption
            page.close();
            page.clearMemoryCache();
        }
    });
}

function createTask(config) {
    tasks.push({
        started:   false,
        completed: false,
        configuration: config
    });
}

function scheduleTasks() {
    if (tasks[0] && !tasks[0].started) {
        tasks[0].started = true;
        checkOneConfiguration(tasks[0]);
    }
    if (tasks[0] && tasks[0].completed) {
        tasks.shift();
    }
}

for (var i = 0; i < configurations.length; i++) {
    createTask(configurations[i]);
}

scheduleTasks.repeat(500);  //Pick up a task every 0.5s
