// CGFix.js - https://github.com/isaacchua/cgfix
let cgfix = {
    removeBlankLines: true,
    galleryEnableHideFilter: true,
    galleryEnableSortByAltName: true
};
mr = (function (mr, $, window, document, cgfix){
    "use strict";

    // remove blank lines ("all-page-modals")
    if (cgfix.removeBlankLines) {
        mr.components.documentReady.push(function(){
            $(".all-page-modals").remove();
        });
    }

    // enable dynamic gallery features
    if (cgfix.galleryEnableHideFilter || cgfix.galleryEnableSortByAltName) {
        mr.components.documentReady.push(function(){
            $(".masonry").each(function(){
                let masonry = $(this);
                let hide = cgfix.galleryEnableHideFilter && masonry.attr("data-hide-filter") === "hide";
                let sortData = masonry.attr("data-sort-alt").toLowerCase();
                let sortAsc = sortData === "asc";
                let sort = cgfix.galleryEnableSortByAltName && (sortAsc || sortData === "desc");

                // hide filter
                if (hide) {
                    masonry.find(".masonry-filter-container").css("display","none");
                }

                // process this per container
                masonry.find(".masonry__container").each(function(){
                    let container = $(this);

                    // delete all elements / images that are not shown to save memory, if filter is hidden
                    if (hide) {
                        let filter = masonry.attr("data-default-filter");
                        container.isotope("remove",container.find("div[data-masonry-filter!='" + filter + "']"))
                            .isotope("layout");
                    }

                    // sort the images by their alt name
                    if (sort) {
                        container.isotope({
                                getSortData: {
                                    altName: item => $(item).find("img").attr("alt")
                                },
                                sortBy: ["altName"],
                                sortAscending: sortAsc
                            })
                            .isotope("updateSortData").isotope();
                    }
                });
            });
        });
    }

    return mr;
}(mr, jQuery, window, document, cgfix));
