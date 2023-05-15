// CGFix.js - https://github.com/isaacchua/cgfix
let cgfix = {
    removeBlankLines: true
};
mr = (function (mr, $, window, document, cgfix){
    "use strict";

    // remove blank lines ("all-page-modals")
    if (cgfix.removeBlankLines) {
        mr.components.documentReady.push(function(){
            $(".all-page-modals").remove();
        });
    }

    // fix dynamic gallery
    let masonry = $(".masonry");
    if (masonry) {
        let container = $(".masonry__container");
        let hide = masonry.attr("data-hide-filter") === "hide";
        let filter = masonry.attr("data-default-filter");
        let fix = function(){
            if (container) {
                if (hide) {
                    // hide filter
                    masonry.find(".masonry-filter-container").css("display","none");

                    // delete all elements / images that are not shown to save memory
                    if (filter) {
                        container.isotope("remove",container.find("div[data-masonry-filter!='" + filter + "']"))
                            .isotope("layout");
                    }
                }

                // sort the images by their alt name
                container.isotope({
                        getSortData: {
                            altName: item => $(item).find("img").attr("alt")
                        },
                        sortBy: ["altName"],
                        sortAscending: true
                    })
                    .isotope("updateSortData").isotope();
            }
        }
        
        mr.components.windowLoad.push(fix);
    }

    return mr;
}(mr, jQuery, window, document, cgfix));
