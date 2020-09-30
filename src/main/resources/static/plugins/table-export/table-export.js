
var TableExport = function() {
    "use strict";
    // function to initiate HTML Table Export
    var runTableExportTools = function() {
        $(".export-excel").on("click", function(e) {
            e.preventDefault();
            var exportTable = $(this).data("table");
            var ignoreColumn = $(this).data("ignorecolumn");
            $(exportTable).tableExport({
                type : 'excel',
                escape : 'false',
                ignoreColumn : '[' + ignoreColumn + ']'
            });
        });
    };
    return {
        // main function to initiate template pages
        init : function() {
            runTableExportTools();
            //runDataTable_example2();
        }
    };
}(jQuery);
