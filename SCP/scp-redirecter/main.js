$(document).ready(function () {
    var href = window.location.href;
    var hrefRegExp = /\?_?[A-Za-z0-9\-=]+/g;
    var link = "http://scp-wiki-cn.wikidot.com/";

    if (hrefRegExp.test(href)) {
        var arguments = href.slice(href.search(hrefRegExp) + 1);

        link = replace(arguments)

        window.location.replace(link);
    } else {
        alert("输入有误！正在将您重定向至 SCP 中文分部首页……");
        window.location.replace('http://scp-wiki-cn.wikidot.com/');
    }

    function replace(arguments) {
        if (/=/g.test(arguments)) {
            var args = arguments.split("&");
            var name, site;
            for (i = 0; i < args.length; i++) {
                if (/name=[A-Za-z0-9\-]+/g.test(args[i])) {
                    name = args[i].slice(args[i].search(/=[A-Za-z0-9\-]+/g) + 1);
                }
                if (/site=[A-Za-z0-9\-]+/g.test(args[i])) {
                    site = args[i].slice(args[i].search(/=[A-Za-z0-9\-]+/g) + 1);
                }
            }
            if (name == undefined) {
                name = "";
            }
            if (site == undefined) {
                site = "scp-wiki-cn";
            }
            link = "http://" + site + ".wikidot.com/" + name;
        } else {
            link = "http://scp-wiki-cn.wikidot.com/" + arguments;
        }
        return link;
    }
})