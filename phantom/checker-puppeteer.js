//By Hongfei Cao on 11/27/2021
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
        identifier: 2,
        name: "老山冻干粉",
        url: "http://detail.tmall.com/item.htm?spm=a1z10.1-b.w8171270-9438708950.55.zZhz6k&id=14943725766",
        selector: ".tm-fcs-panel",
        timeout: 20,
        loadImages: false,
        enabled: false,
        useProxy: false,
        interval: 30    //minutes
    },
    {
        identifier: 3,
        name: "上海天气",
        url: "http://www.weather.com.cn/weather/101020100.shtml",
        selector: "ul.t.clearfix .on",
        timeout: 20,
        loadImages: false,
        enabled: true,
        useProxy: false,
        interval: 25    //minutes
    },
    {
        identifier: 7,
        name: "GD",
        url: "http://gold.hexun.com/hjxh/",
        selector: "#newprice",
        timeout: 40,
        loadImages: false,
        enabled: false,
        useProxy: false,
        interval: 60    //minutes
    },
    {
        identifier: 8,
        name: "菲律宾 sunflower 新苗向日葵 芝士乳酪夹心饼干 早餐代餐办公室休闲零食 700g/盒",
        url: "https://item.jd.com/4068469.html",
        selector: ".summary-price .p-price",
        timeout: 40,
        loadImages: false,
        enabled: true,
        useProxy: false,
        interval: 180    //minutes
    },
    {
        identifier: 10,
        name: "USDCNY",
        url: "http://www.kuaiyilicai.com/bank/rmbfx/b-cmbc.html",
        selector: ".ui-responsive.table-stripe tr:nth-child(2) td:nth-child(4)",
        timeout: 40,    //seconds
        loadImages: false,
        enabled: false,
        useProxy: false,
        interval: 5    //minutes
    },
    {
        identifier: 12,
        name: "罗氏（ROCHE）血糖仪家用血糖试纸 卓越金采型（100片装+100支采血针）",
        url: "https://item.jd.com/1784892.html",
        selector: ".summary-price .p-price",
        timeout: 120,    //seconds
        loadImages: false,
        enabled: true,
        useProxy: false,
        interval: 180    //minutes
    },
    {
        identifier: 13,
        name: "摩根国际债券(美元)(每月派息-现金派息) U44707",
        url: "https://www.hangseng.com/zh-cn/fundsupermart/fund/fundinfo/?fundCode=U44707",
        selector: ".fs_table-body .fs_bottom.fs_table-row",
        timeout: 120,    //seconds
        loadImages: false,
        enabled: false,
        useProxy: false,
        interval: 180    //minutes
    }
];

var tasks = [];

var records = [];

function addRecord(result) {
    records.push(result);

    //whether it's 3rd consecutive error
    var latestResult = [], latestNonEmptyInfo = null;
    for (var i = records.length - 1; i >= 0; i--) {
        if (records[i].identifier === result.identifier) {
            if (latestResult.length < 3) {
                latestResult.push(records[i]);
            }
            if (!latestNonEmptyInfo && records[i].text && i !== records.length - 1) {
                latestNonEmptyInfo = records[i].text;
            }
            if (latestResult.length >= 3 && latestNonEmptyInfo) {
                break;
            }
        }
    }
    var message = null;
    if (latestResult.length === 3 && !latestResult[0].text && !latestResult[1].text && !latestResult[2].text) {
        message = "Failed to get '$1' three times, the latest known is:\n$2".format(result.name, latestNonEmptyInfo ? latestNonEmptyInfo : "Unknown");
    }
    else if (result.text && result.text !== latestNonEmptyInfo) {
        message = "$1 changed from\n\n$2\n\nto\n\n$3".format(result.name, latestNonEmptyInfo ? latestNonEmptyInfo : "EMPTY", result.text)
    }
    if (message) {
        var process = require("child_process");
        var spawn = process.spawn;
        spawn("osascript", ["-e", 'tell app "System Events" to display dialog "$1"'.format(message)]);
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
        waitFor(function() {
            return page.evaluate(function(config) {
                return document.querySelectorAll(config.selector).length > 0;
            }, config);
        }, function(criteriaMet) {
            if (criteriaMet) {
                result.text = page.evaluate(function(config) {
                    var result = document.querySelectorAll(config.selector);
                    var texts = [];
                    for (var i = 0; i < result.length; i++) {
                        texts.push(result[i].innerText);
                    }
                    return texts.join("\n");
                }, config);
            } else {
                result.text = "";
                result.emptyText = true;
            }
            end();
        }, 20 * 1000);

        function end() {
//            result.text = result.text.replace(/[\t]+/g, "").replace(/[\r\n]+/g, "\n").trim();
            result.text = result.text.replace(/[\s]+/g, function(matched) {
                return matched.match(/[\r\n]/) ? "\n" : " ";
            }).trim();
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
    if (!config.enabled) {
        return;
    }
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

/*
for (var i = 0; i < configurations.length; i++) {
    createTask(configurations[i]);
}

scheduleTasks.repeat(500);  //Pick up a task every 0.5s
*/

// 调用方法： permutation([1, 2, 3])
function permutation(arr) {
    let len = arr.length
    let res = [] // 所有排列结果
    /**
     * 【全排列算法】
     * 说明：arrange用来对arr中的元素进行排列组合，将排列好的各个结果存在新数组中
     * @param tempArr：排列好的元素
     * @param leftArr：待排列元素
     */
    let arrange = (tempArr, leftArr) => {
        if (tempArr.length === len) { // 这里就是递归结束的地方
            // res.push(tempArr) // 得到全排列的每个元素都是数组
            res.push(tempArr)
        } else {
            leftArr.forEach((item, index) => {
                let temp = [].concat(leftArr)
                temp.splice(index, 1)
                // 此时，第一个参数是当前分离出的元素所在数组；第二个参数temp是传入的leftArr去掉第一个后的结果
                arrange(tempArr.concat(item), temp) // 这里使用了递归
            })
        }
    }
    arrange([], arr)
    return res
}

// 调用方法： cartesian([1,2], [10,20], [100,200,300])
function cartesian() {
    function addTo(curr, args) {
        var i, copy,
            rest = args.slice(1),
            last = !rest.length,
            result = [];
        for (i = 0; i < args[0].length; i++) {
            copy = curr.slice();
            copy.push(args[0][i]);
            if (last) {
                result.push(copy);
            } else {
                result = result.concat(addTo(copy, rest));
            }
        }
        return result;
    }
    return addTo([], Array.prototype.slice.call(arguments));
}

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({defaultViewport: {width: 1440, height: 900}});
    const page = await browser.newPage();
    // await page.goto('https://item.jd.com/6364108.html');
    // await page.goto('https://item.jd.com/3399939.html');
    await page.goto('https://item.jd.com/851672.html');
    await page.waitForSelector('.summary-price-wrap', {visible: true});
    let originalPrice = await page.$eval('.summary-price .p-price .price', (el) => {
        return +el.textContent;
    });
    let allPromotionTexts = [];
    allPromotionTexts = allPromotionTexts.concat(await page.$$eval('#summary-quan .quan-item', (els) => {
        return els.map(el => {
            return el.querySelector('.text').textContent;
        });
    }));
    allPromotionTexts = allPromotionTexts.concat(await page.$$eval('#summary-promotion .prom-item', (els) => {
        return els.map(el => {
            return el.querySelector('.hl_red').textContent;
        });
    }));

    // 同一个level里，一次只能用一个；level值不表示优先级，不同level可以以任意顺序组合，虽然有些顺序一定是更贵的
    let parserConfig = [{
        splitter: '',
        regex: /满([\d.]+)减([\d.]+)/,
        keys: ['whole_sum', 'subtraction'],
        level: 2
    }, {
        splitter: '',
        regex: /满([\d.]+)件，总价打([\d.]+)折/,
        keys: ['quantity', 'discount'],
        level: 1
    }, {
        splitter: '',
        regex: /每满([\d.]+)元，可减([\d.]+)元现金/,
        keys: ['every_sum', 'subtraction'],
        level: 2
    }, {
        splitter: '，',
        regex: /满([\d.]+)元减([\d.]+)元/,
        keys: ['whole_sum', 'subtraction'],
        level: 2
    }];
    // 缺省的是"不打折"这种"优惠"，以避免由于打折而不能享受满减这个问题
    let allPromotions = [{text: '不打折', level: 1, quantity: 0, discount: 10.0}];
    for (let text of allPromotionTexts) {
        let oldLength = allPromotions.length;
        for (let c of parserConfig) {
            let arr;
            if (c.splitter) {
                arr = text.split(c.splitter)
            }
            else {
                arr = [text]
            }
            let foundMatch = false;
            for (let line of arr) {
                let match = line.match(c.regex)
                if (match && c.keys.every((key, index) => !!match[index + 1])) {
                    let obj = {text: line, level: c.level};
                    c.keys.forEach((key, index) => {
                        obj[key] = +match[index + 1]
                    })
                    allPromotions.push(obj);
                    foundMatch = true;
                }
            }
            // parser config是有优先级的
            if (foundMatch) {
                break;
            }
        }
        if (allPromotions.length === oldLength) {
            allPromotions.push({unparsed: text})
        }
    }

    console.log(originalPrice, allPromotions);

    const levelToPromotions = {};
    // 按照level进行分组
    for (let p of allPromotions) {
        if (!p.level) {
            continue;
        }
        let array = levelToPromotions[p.level];
        if (!array) {
            levelToPromotions[p.level] = [p];
        }
        else {
            array.push(p);
        }
    }

    const allLevels = Object.keys(levelToPromotions).map(levelStr => +levelStr);

    // [1, 2, 3], [1, 3, 2], [2, 1, 3], ...
    // 决定了每个level的计算顺序
    const levelCombinations = permutation(allLevels);

    let allPossiblePromotionCombinations = [];
    levelCombinations.forEach(lc => {
        allPossiblePromotionCombinations = allPossiblePromotionCombinations.concat(cartesian.apply(null, lc.map(level => levelToPromotions[level])));
    });
    // allPossiblePromotionCombinations的结构如下
    // [
    //     [
    //         { text: '不打折', level: 1, quantity: 0, discount: 10 },
    //         { text: '满149减15', level: 2, whole_sum: 149, subtraction: 15 }
    //     ],
    //     [
    //         { text: '满2件，总价打9折', level: 1, quantity: 2, discount: 9 },
    //         { text: '满149减15', level: 2, whole_sum: 149, subtraction: 15 }
    //     ],
    //     [
    //         { text: '满149减15', level: 2, whole_sum: 149, subtraction: 15 },
    //         { text: '不打折', level: 1, quantity: 0, discount: 10 }
    //     ],
    //     [
    //         { text: '满149减15', level: 2, whole_sum: 149, subtraction: 15 },
    //         { text: '满2件，总价打9折', level: 1, quantity: 2, discount: 9 }
    //     ]
    // ]

    function sortPromotion(a, b) {
        if (a.average !== b.average) {
            return a.average - b.average;
        }
        else {
            return a.count - b.count;
        }
    }
    function getMinimumTotalAfterPromotions(count, amount) {
        return allPossiblePromotionCombinations.map(promotions => {
            let discounted = amount;
            promotions.forEach(p => {
                // 打折促销
                if (p.quantity && count >= p.quantity) {
                    discounted = discounted * p.discount / 10.0;
                }
                // 总额满减促销
                else if (p.whole_sum && discounted >= p.whole_sum) {
                    discounted = discounted - p.subtraction;
                }
                // 使用每满满减促销
                else if (p.every_sum && discounted >= p.every_sum) {
                    discounted = discounted - Math.floor(discounted / p.every_sum) * p.subtraction;
                }
            });
            return {
                count: count,
                amount: amount,
                average: +((discounted / count).toFixed(2)),
                promotions: promotions
            }
        }).sort(sortPromotion)[0];
    }

    // 试算各种数量的价格
    let result = []
    for (let i = 1; i <= 8; i++) {
        let rawTotal = originalPrice * i;
        result.push(getMinimumTotalAfterPromotions(i, rawTotal));
    }
    result.sort(sortPromotion);
    result.forEach(c => {
        console.log(`购买${c.count}件，均价${c.average.toFixed(2)}，促销方案：${c.promotions.map(p => p.text).join('→')}`);
    })

    // await page.screenshot({ path: 'example.png' });

    await browser.close();
})();