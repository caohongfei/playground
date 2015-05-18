Function.prototype.repeat = function (interval) {
    var __method = this, args = Array.prototype.slice.call(arguments, 1);
    function call() {
        f();
    }
    function f() {
        __method.apply(__method, args);
        setTimeout(call, interval);
    }
    call();
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

function formatDate(date) {
    function padding(num) {
        return num < 10 ? "0" + num : String(num);
    }
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + padding(monthIndex + 1) + "-" + padding(day) + " " + padding(date.getHours()) + ":" + padding(date.getMinutes()) + ":" + padding(date.getSeconds());
}

var configurations = [
    //{
    //    name: "GNC Triple Fish Oil",
    //    url: "http://www.gnc.com/GNC-Triple-Strength-Fish-Oil-1500/product.jsp?productId=12643679",
    //    selector: ".product-price.product-sprite .now",
    //    timeout: 40,    //seconds
    //    loadImages: false,
    //    alreadyHasJQ: true,
    //    useProxy: true,
    //    interval: 30    //minutes
    //},
    {
        name: "Laoshan Bee",
        url: "http://detail.tmall.com/item.htm?spm=a1z10.1-b.w8171270-9438708950.55.zZhz6k&id=14943725766",
        selector: ".tm-promo-price .tm-price",
        timeout: 20,
        loadImages: true,
        alreadyHasJQ: false,
        useProxy: false,
        interval: 0.1    //minutes
    }
];

var tasks = [];

var records = [];

function checkOneConfiguration(task) {
    var config = task.configuration;
    console.log(formatDate(new Date()) + ": Check " + config.name);
    if (config.useProxy) {
        phantom.setProxy("localhost", "1080", "socks5");
    }
    else {
        phantom.setProxy(null);
    }
    var page = require('webpage').create();
    page.settings.loadImages = config.loadImages;
    page.settings.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36";
    //time out checking
    var isFinished = false; //success and fail are both "finished"
    var result = {
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

    function analysePage(injectSuccess) {
        function readInfo() {
            var text = page.evaluate(function(config) {
                return jQuery(config.selector).text();
            }, config);
            if (!text) {
                result.emptyText = true;
                result.text = text;
                return false;
            }
            else {
                result.emptyText = false;
                result.text = text;
                return true;
            }
        }
        if (injectSuccess) {
            var text = page.evaluate(function(config) {
                return jQuery(config.selector).text();
            }, config);
            if (!text) {
                result.emptyText = true;
            }
            result.text = text;
        } else {
            result.text = "Inject failure";
        }
        page.render(config.name + ".png");
    }

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
        console.log(status);
        console.log('Content: ' + page.content);
        clearTimeout(timeout);
        isFinished = true;
        if (!config.alreadyHasJQ) {
            if (page.injectJs("jquery.min.js")) {
                analysePage(true);
            }
            else {
                analysePage(false);
            }
        }
        else {
            analysePage(true);
        }
        records.push(result);
        setTimeout(function() {
            createTask(config);
        }, config.interval * 60 * 1000);
        task.completed = true;
        console.log((result.text ? result.text : "'EMPTY'") + "\n");
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

scheduleTasks.repeat(500);