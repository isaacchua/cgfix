// CGFix.js v1.2.0 (2023-09-27) - https://github.com/isaacchua/cgfix
let cgfix = {
    removeBlankLines: true,
    galleryEnableHideFilter: true,
    galleryEnableSortByAltName: true,
    loginEnable: true,
    loginLinkText: "Login",
    loginGroupId: "mygroup",
    loginCheckLoggedInPage: "logged-in",
    loginRedirectPage: null,
    restoreMobileNav: true,
    restoreMobileNavSelector: ".col-xs-9.col-sm-10.text-right",
    restoreMobileNavHtml: '<a href="#" class="hamburger-toggle" data-toggle-class="#menu1;hidden-xs hidden-sm"><i class="icon icon--sm stack-interface stack-menu"></i></a>',
    emptyIconTags: true
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

    // enable login button
    if (cgfix.loginEnable) {
        mr.components.documentReady.push(function() {
            // check whether links to logged in page exist
            let loggedInCheck = $("a[href='/".concat(cgfix.loginGroupId, "/", cgfix.loginCheckLoggedInPage, "/']"));

            // if the logged in page doesn't exist, create login link
            if (loggedInCheck.length === 0) {
                let loginUrl = "/login_only?redirect=".concat(cgfix.loginGroupId,
                    cgfix.loginRedirectPage == null ? "/" : "/".concat(cgfix.loginRedirectPage, "/"));
                $(".section-cont__content-menu").append("<li class=\"dropdown hasNoSubMenu\"><span class=\"dropdown__trigger\"><a href=\""
                    .concat(loginUrl, "\" aria-label=\"", cgfix.loginLinkText, "\">", cgfix.loginLinkText, "</a></span></li>"));
                $("footer #menu-footer-menu").append("<li class=\"menu-item menu-item-type-custom menu-item-object-custom\"><a href=\""
                    .concat(loginUrl, "\" aria-label=\"", cgfix.loginLinkText, "\"><span class=\"h6 type--uppercase\">", cgfix.loginLinkText, "</span></a></li>"));
            }

            // delete logged in, blank (i.e., no access), and broken link list items
            let links = loggedInCheck.add("a[href='/".concat(cgfix.loginGroupId, "//']")).add("a[href='[CONTENT-FOOTER_MENU_URL]']");
            let listItems = links.parent("li").add(links.parent("span").parent("li"));
            listItems.remove();
        });
    }

    // restore mobile nav hamburger
    if (cgfix.restoreMobileNav) {
        mr.components.documentReady.push(function() {
            $(cgfix.restoreMobileNavSelector).html(cgfix.restoreMobileNavHtml);
        });
    }

    // empty content in icon tags
    if (cgfix.emptyIconTags) {
        mr.components.documentReady.push(function() {
            $("i.icon").empty();
        });
    }

    return mr;
}(mr, jQuery, window, document, cgfix));
