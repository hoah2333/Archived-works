jQuery(function () {
    $("#main-input").load(
        "http://backrooms-oversight-cn.wdfiles.com/local--code/crom-search-tag-list/1 pre",
        function (responseTxt) {
            $("#main-input").val(responseTxt.slice(0, -1));
        }
    );
    var wrapper_number = 1;
    $("#add").on("click", function () {
        wrapper_number = wrapper_number + 1;
        append_content();
    });
    $("#minus").on("click", function () {
        $(".wrapper" + wrapper_number).remove();
        wrapper_number = wrapper_number - 1;
        if (wrapper_number <= 1) {
            wrapper_number = 1;
        }
    });

    function append_content() {
        var append_content = "";
        append_content += '<div class="input-wrapper wrapper' + wrapper_number + '">';
        append_content += '<textarea class="input textarea1" rows="1"></textarea>';
        append_content += '<p class="arrow">-></p>';
        append_content += '<textarea class="input textarea2" rows="1"></textarea>';
        append_content += "</div>";
        $("#addition-wrapper").append(append_content);
    }
    $("#confirm").on("click", function () {
        var description =
            "这是一个 [https://toml.io/cn/v1.0.0 TOML] 配置文件，被 [https://backrooms-wiki-cn.wikidot.com/tag-search Crom 标签搜索]利用以为终端用户提供标签的纯文本描述。\n";
        description += "\n";
        description +=
            "配置文件生成器在[http://backrooms-oversight-cn.wdfiles.com/local--code/crom-search-tag-list-manifester/1 此处]。\n";
        description += '[[code type="toml"]]\n';
        var total_input = description;
        total_input += $("#main-input").val();
        for (var output_number = 1; output_number <= wrapper_number; output_number++) {
            if (total_input != description) {
                total_input += "\n\n";
            }
            total_input += "[[tags]]\n";
            total_input += 'name = "' + $(".wrapper" + output_number + " .textarea1").val() + '"\n';
            total_input += 'description = "' + $(".wrapper" + output_number + " .textarea2").val() + '"';
        }
        total_input += "\n[[/code]]";
        $("#output").val(total_input);
    });

    function check_input() {
        var total_input = $("#main-input").val();
        /* to do */
    }
});
