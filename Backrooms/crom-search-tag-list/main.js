$(document).ready(function () {
    var wrapper_number = 1;

    $("#add").click(function () {
        wrapper_number = wrapper_number + 1;
        append_content();
    });
    $("#minus").click(function () {
        $(".wrapper" + wrapper_number).remove();
        wrapper_number = wrapper_number - 1;
        if (wrapper_number <= 1) {
            wrapper_number = 1;
        }
    });

    function append_content() {
        var append_content = "";
        append_content += "<div class=\"input-wrapper wrapper" + wrapper_number + "\">";
        append_content += "<textarea class=\"input textarea1\" rows=\"1\"></textarea>";
        append_content += "<p class=\"arrow\">-></p>";
        append_content += "<textarea class=\"input textarea2\" rows=\"1\"></textarea>";
        append_content += "</div>";
        $("#addition-wrapper").append(append_content);
    }

    $("#confirm").click(function () {
        function check_input();
        
        var total_input = $("#main-input").val();
        for (output_number = 1; output_number <= wrapper_number; output_number++) {
            if (total_input != "") {
                total_input += "\n\n";
            }
            total_input += "[[tags]]\n";
            total_input += "name = \"" + $(".wrapper" + output_number + " .textarea1").val() + "\"\n";
            total_input += "description = \"" + $(".wrapper" + output_number + " .textarea2").val() + "\"";
        }
        $("#output").val(total_input);
    })

    function check_input() {
        var total_input = $("#main-input").val();
        /* to do */
    }
});