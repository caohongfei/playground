const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// const ROOT = '/Users/hcao/Downloads/test';
// const ROOT = '/Users/hcao/Downloads/已发金总81人';
const ROOT = '/Volumes/it/文件交换/src_check/all-4';
const NAMES_FILE = '/Users/hcao/Downloads/离职人员检索关键词列表202107.txt';
// const OUT_DIR = '/Users/hcao/Downloads/金总需求';
const OUT_DIR = '/Volumes/it/文件交换/src_check/all-4-out';

const REPORT_FILE = path.resolve(OUT_DIR, "核检报告.txt");
const KEYWORD_DIR = path.resolve(OUT_DIR, "关键词");
const ORIGINAL_DIR = path.resolve(OUT_DIR, "个人");

var keywords;
var reportLines = [];

fs.readFile(NAMES_FILE, 'utf8', (err, data) => {
    let start = new Date();
    keywords = data.split("\r\n").filter(s => !!s);
    visitDirectory(ROOT);
    fs.writeFileSync(REPORT_FILE, reportLines.join("\r\n"), {encoding: 'utf8'});
    console.log('耗时：', (new Date().getTime() - start.getTime()) / 1000);
});

function visitDirectory(dir) {
    console.log("Visiting " + dir);
    var files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.resolve(dir, file);
        const stat = fs.statSync(fullPath);
        if (file.endsWith('.html')) {
            const data = fs.readFileSync(fullPath, 'utf8');
            reportLines.push(processOneFile(data, fullPath));
        }
        else if (stat.isDirectory()) {
            visitDirectory(fullPath);
        }
    });
}

function processOneFile(content, fullPath) {
    let usedContent = content;
    // 只保留"相关搜索"之前的内容
    let index = content.indexOf("相关搜索");
    if (index > 0) {
        usedContent = content.substr(0, index);
    }

    let $ = cheerio.load(usedContent);
    // 删除"其他人还在搜"
    $('[tpl="recommend_list"]').remove();
    // 删除"百度快照部分"
    $('.c-gap-top-xsmall').remove();
    // $('.se_st_footer').remove();

    // 取文本而不是html，因为有"深圳<em>证监会</em>"这种情况
    // usedContent = $.text();
    usedContent = $.html();

    const matchedKeywords = [];
    keywords.forEach(keyword => {
        if (usedContent.indexOf(keyword) >= 0) {
            storeFoundFile(keyword, fullPath);
            matchedKeywords.push(keyword);
        }
    });
    var subpath = fullPath.substring(ROOT.length + 1);
    if (matchedKeywords.length === 0) {
        return subpath + " 无匹配关键词";
    }
    else {
        return subpath + " 匹配关键词: " + matchedKeywords.join("、");
    }
}

function storeFoundFile(keyword, fullPath) {
    const dirname = path.basename(path.dirname(fullPath));  // 丁晨昌证监交易所协会

    const dirKeyword = path.resolve(KEYWORD_DIR, keyword, dirname);
    const destKeyword = path.resolve(dirKeyword, path.basename(fullPath));
    if (!fs.existsSync(dirKeyword)) {
        fs.mkdirSync(dirKeyword, {recursive: true});
    }
    fs.copyFileSync(fullPath, destKeyword);

    const dirOriginal = path.resolve(ORIGINAL_DIR, dirname);
    const destOriginal = path.resolve(dirOriginal, path.basename(fullPath));
    if (!fs.existsSync(dirOriginal)) {
        fs.mkdirSync(dirOriginal, {recursive: true});
    }
    fs.copyFileSync(fullPath, destOriginal);
}