$(document).ready(function () {
    var href = window.location.href;
    var link = href.slice(href.search(/\?_?[A-Za-z0-9\-]+/g) + 1);
    window.location.replace('https://scp-wiki-cn.wikidot.com/' + link);
})