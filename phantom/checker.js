var configurations = [
    {
        name: "GNC Triple Fish Oil",
        url: "http://www.gnc.com/GNC-Triple-Strength-Fish-Oil-1500/product.jsp?productId=12643679",
        selector: ".product-price.product-sprite .now",
        timeout: 40,
        loadImages: false,
        alreadyHasJQ: true,
        useProxy: true
    },
    {
        name: "Laoshan Bee",
        url: "http://detail.tmall.com/item.htm?spm=a1z10.1-b.w8171270-9438708950.55.zZhz6k&id=14943725766",
        selector: ".tm-promo-price .tm-price",
        timeout: 20,
        loadImages: true,
        alreadyHasJQ: false,
        useProxy: false
    }
];

phantom.setProxy("localhost", "1080", "socks5");
//phantom.setProxy(null);

function formatDate(date) {
    function padding(num) {
        return num < 10 ? "0" + num : String(num);
    }
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + padding(monthIndex + 1) + "-" + padding(day) + " " + padding(date.getHours()) + ":" + padding(date.getMinutes());
}

function checkAllConfigurations() {

    console.log("\nCheck all configurations on " + formatDate(new Date()));
    function checkOneConfiguration(config) {
        var page = require('webpage').create();
        page.settings.loadImages = config.loadImages;
        console.log("Checking " + config.name);
        //time out checking
        var isFinished = false; //success and fail are both "finished"
        var timeout = setTimeout(function() {
            if (!isFinished) {
                console.log("Checking " + config.name + " timed out, stop it and see what we get.");
                page.stop();
            }
        }, config.timeout * 1000);

        function analysePage() {
            var text = page.evaluate(function(config) {
                return jQuery(config.selector).text();
            }, config);
            console.log(text);
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
            // uncomment to log into the console
            // console.error(msgStack.join('\n'));
        };

        page.open(config.url, function(status) {
            clearTimeout(timeout);
            isFinished = true;
            if (!config.alreadyHasJQ) {
                if (page.injectJs("jquery.min.js")) {
                    analysePage();
                }
            }
            else {
                analysePage();
            }
        });
    }

    for (var i = 0; i < configurations.length; i++) {
        var config = configurations[i];
        checkOneConfiguration(config);
    }
}

checkAllConfigurations();