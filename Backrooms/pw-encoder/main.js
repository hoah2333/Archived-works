$(function () {
    $("#encode-1").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = characterEncode(input);
        } else {
            console.error("Encode-1: 输入栏不得为空");
            $("#info").append("Encode-1: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#encode-2").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = base64Encode(input);
        } else {
            console.error("Encode-2: 输入栏不得为空");
            $("#info").append("Encode-2: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#encode-3").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = shell(input);
        } else {
            console.error("Encode-3: 输入栏不得为空");
            $("#info").append("Encode-3: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#decode-1").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = unshell(input);
        } else {
            console.error("Decode-1: 输入栏不得为空");
            $("#info").append("Decode-1: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#decode-2").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = base64Decode(input);
        } else {
            console.error("Decode-2: 输入栏不得为空");
            $("#info").append("Decode-2: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#decode-3").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = characterDecode(input);
        } else {
            console.error("Decode-3: 输入栏不得为空");
            $("#info").append("Decode-3: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#encode-all").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = characterEncode(input);
            input = base64Encode(input);
            input = shell(input);
        } else {
            console.error("Encode-All: 输入栏不得为空");
            $("#info").append("Encode-All: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });
    $("#decode-all").on("click", function () {
        var input = $("#input").val();
        if (input) {
            input = unshell(input);
            input = base64Decode(input);
            input = characterDecode(input);
        } else {
            console.error("Decode-All: 输入栏不得为空");
            $("#info").append("Decode-All: 输入栏不得为空\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
        }
        $("#input").val(input);
    });

    function characterEncode(input) {
        var contentReg = new RegExp("content:(\\s?)(\"|')[^\"|^']+(\"|')(;?)");
        var content = [""];
        var convert = [""];
        if (!contentReg.test(input)) {
            console.log("Encode-1: 未找到 content 内容");
            $("#info").append("Encode-1: 未找到 content 内容\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
            return input;
        }
        for (var contentAmount = 0; contentReg.test(input); contentAmount++) {
            content[contentAmount] = input.match(contentReg)[0];
            input = input.replace(
                new RegExp(content[contentAmount].replace(/\\/g, "\\\\")),
                "content$" + contentAmount
            );
        }
        for (var i = 0; i < content.length; i++) {
            convert[i] = stringToUTF8(content[i]);
            input = input.replace(new RegExp("content\\$" + i), convert[i]);
        }
        return input;
    }

    function stringToUTF8(string) {
        var UTF8 = "";
        for (var i = 0; i < string.length; i++) {
            if (/[\uFF00-\uFFFF]|[\u4e00-\u9fa5]|\u3002|\u201c|\u201d/.test(string[i])) {
                UTF8 += "\\" + string.charCodeAt(i).toString(16);
            } else {
                UTF8 += string[i];
            }
        }
        return UTF8;
    }

    function characterDecode(input) {
        var contentReg = new RegExp("content:(\\s?)(\"|')[^\"|^']+(\"|')(;?)");
        var content = [""];
        var convert = [""];
        if (!contentReg.test(input)) {
            console.log("Decode-3: 未找到 content 内容");
            $("#info").append("Decode-3: 未找到 content 内容\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
            return input;
        }
        for (var contentAmount = 0; contentReg.test(input); contentAmount++) {
            content[contentAmount] = input.match(contentReg)[0];
            input = input.replace(
                new RegExp(content[contentAmount].replace(/\\/g, "\\\\")),
                "content$" + contentAmount
            );
        }
        for (var i = 0; i < content.length; i++) {
            convert[i] = UTF8ToString(content[i]);
            input = input.replace(new RegExp("content\\$" + i), convert[i]);
        }
        return input;
    }

    function UTF8ToString(UTF8) {
        var codes = [""];
        var convert = [""];
        var UTF8Reg = new RegExp("\\\\[\\w]{4}");
        var UTF8Amount = 0;
        if (!UTF8Reg.test(UTF8)) {
            console.log("Decode-3: 未找到可解密内容");
            $("#info").append("Decode-3: 未找到可解密内容\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
            return UTF8;
        }
        for (var UTF8Amount = 0; UTF8Reg.test(UTF8); UTF8Amount++) {
            codes[UTF8Amount] = UTF8.match(UTF8Reg)[0].replace(/\\/, "");
            UTF8 = UTF8.replace(UTF8Reg, "UTF8$" + UTF8Amount);
        }
        for (var i = 0; i < codes.length; i++) {
            convert[i] = String.fromCharCode(parseInt(codes[i], 16));
            UTF8 = UTF8.replace(new RegExp("UTF8\\$" + i), convert[i]);
        }
        return UTF8;
    }

    function base64Encode(input) {
        try {
            input = btoa(input);
        } catch (e) {
            console.error("Encode-2: 输入中不可以有汉字，请先把汉字转换为 UTF-8 的形式");
            $("#info").append("Encode-2: 输入中不可以有汉字，请先把汉字转换为 UTF-8 的形式\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
            return input;
        }
        return input;
    }

    function base64Decode(input) {
        try {
            input = atob(input);
        } catch (e) {
            if (/Latin/.test(e)) {
                console.error("Decode-2: 输入中不可以有汉字，请先把汉字转换为 UTF-8 的形式");
                $("#info").append("Decode-2: 输入中不可以有汉字，请先把汉字转换为 UTF-8 的形式\n");
                $("#info").scrollTop($("#info")[0].scrollHeight);
            } else if (/not correctly encoded/.test(e)) {
                console.error("Decode-2: 该输入未被加密");
                $("#info").append("Decode-2: 该输入未被加密\n");
                $("#info").scrollTop($("#info")[0].scrollHeight);
            }
        } finally {
            return input;
        }
    }

    function shell(input) {
        input = '@import url("data:text/css;charset=UTF-8;base64,' + input + '");';
        return input;
    }

    function unshell(input) {
        var prefix = new RegExp('@import[\\s]url\\("data:text\\/css;charset=UTF-8;base64,');
        var suffix = new RegExp('\\"\\);');
        if (!prefix.test(input) || !suffix.test(input)) {
            console.log("Decode-1: 未检测到 @import");
            $("#info").append("Decode-1: 未检测到 @import\n");
            $("#info").scrollTop($("#info")[0].scrollHeight);
            return input;
        }
        input = input.replace(prefix, "");
        input = input.replace(suffix, "");
        return input;
    }
});
