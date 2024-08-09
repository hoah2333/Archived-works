$(function () {
    var href = window.location.href;
    var hrefRegExp = /\?_?[A-Za-z0-9\-=/:]+/g;
    var link = "https://scp-wiki-cn.wikidot.com/";
    if (hrefRegExp.test(href)) {
        var argument = href.slice(href.search(hrefRegExp) + 1);
        link = replace(argument);
        window.location.replace(link);
    } else {
        alert("输入有误！正在将您重定向至 SCP 中文分部首页……");
        window.location.replace("https://scp-wiki-cn.wikidot.com/");
    }

    function replace(argument) {
        if (/=/g.test(argument)) {
            var args = argument.split("&");
            var name, site, url;
            for (var i = 0; i < args.length; i++) {
                if (/name=[A-Za-z0-9\-/:]+/g.test(args[i])) {
                    name = args[i].slice(args[i].search(/=[A-Za-z0-9\-/:]+/g) + 1);
                }
                if (/site=[A-Za-z0-9\-]+/g.test(args[i])) {
                    site = args[i].slice(args[i].search(/=[A-Za-z0-9\-]+/g) + 1);
                }
                if (/url=[A-Za-z0-9\-/:]+/g.test(args[i])) {
                    url = args[i].slice(args[i].search(/=[A-Za-z0-9\-/:]+/g) + 1);
                }
            }
            if (name == undefined) {
                name = "";
            }
            if (site == undefined) {
                site = "scp-wiki-cn";
            }
            link = "https://" + site + ".wikidot.com/" + name;
            if (url !== undefined) {
                link = url;
            }
        } else {
            link = "https://scp-wiki-cn.wikidot.com/" + arguments;
        }
        return link;
    }
});
