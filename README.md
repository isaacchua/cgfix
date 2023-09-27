# CGFix.js

A JavaScript module to fix issues that arise on CampusGroups group websites.

Also contains CSS fixes under [css/](css/).

## Features

1. Remove blank lines (`all-page-modals`). These are basically spacings that CampusGroups automatically adds to the page after every edit on the Website Builder. This causes certain sections to increasingly get longer with more whitespace over time. Absolutely essential if the page gets many edits.

2. Enable dynamic gallery features:
    - Hide filter drop-down.
    - Delete filtered-out hidden images.
    - Sort images by alt name (based on the file name by default) instead of CampusGroups own default sorting by upload date.

3. Add login link to navigation bars if user is not logged in.

4. Restore the missing navigation hamburger if the _Edit HTML (advanced)_ feature is used. This happens because the hamburger icon uses the modern `<i class="icon ..."></i>` convention today, which repurposes the italics HTML tag without any content therein. This causes the archaic editor to detect an empty tag and replace the entire `<i>` and the `<a>` around it with a `&nbsp;`. This fix replaces the content within the elements of the given selector with the supplied HTML.

5. Empty the content in icon tags. One way to get around the _Edit HTML (advanced)_ editor bug when using icon tags is to insert some arbitrary content like a `&nbsp;` in between the `<i>` tags. This feature removes the arbitrary content from all icon tags, which will restore any layout issues arising from arbitrary content.

## Installation

1. Click on the **Website Settings** button on your group's website admin panel.
2. Paste the contents of [cgfix.js](https://github.com/isaacchua/cgfix/blob/master/cgfix.js) between `<script></script>` tags in the **Website Custom JavaScript** box:
```
<script>
// CGFix.js - https://github.com/isaacchua/cgfix
let cgfix = { ...
</script>
```

## Configuration

CGFix.js is configured in the `cgfix` object at the start of the code:
```
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
    restoreMobileNavHtml: '<a href="#" class="hamburger-toggle" ...',
    restoreMobileNavAnchorSelector: ".hamburger-toggle",
    restoreMobileNavMenuSelector: "nav",
    restoreMobileNavMenuToggleClass: ["hidden-xs", "hidden-sm"],
    emptyIconTags: true
};
```

### Remove blank lines

Set `removeBlankLines` to `true` if you want CGFix.js to automatically remove lines added by the Website Builder; `false` otherwise.

### Dynamic Gallery: Hide category filter

Set `galleryEnableHideFilter` to `true` if you want CGFix.js to hide the Dynamic Gallery category filter. You will also need to set the `data-hide-filter` attribute to `hide` on the `<div class="masonry">` tag to enable hiding the category filter on that Dynamic Gallery (there can be multiple instances of the Dynamic Gallery on one page). This is done in the **Source** section of the **Edit HTML (advanced)** option of your webpage.

```
<div class="masonry" data-hide-filter="hide" data-default-filter="1234567">
```

You may also choose to set a default filter ID on the Dynamic Gallery to show images only from that folder. These IDs can be found by viewing the source code of page with the Dynamic Gallery widget.

### Dynamic Gallery: Sort by alt name

Set `galleryEnableSortByAltName` to `true` if you want CGFix.js to sort the images in the Dynamic Gallery by their `alt` names. CampusGroups sort the images in order of newest upload to oldest, which may not be desirable. By default, the `alt` name of the images are the original file names of the images, so if there is an order already set there, you can use this feature to force sorting by that order.

You will also need to specify the `data-sort-alt` attribute on the `<div class="masonry">` tag with either `asc` (ascending order) or `desc` (descending order) to enable sorting on that Dynamic Gallery. This is done in the **Source** section of the **Edit HTML (advanced)** option of your webpage.

```
<div class="masonry" data-sort-alt="asc">
```

### Login link

Set `loginEnable` to `true` if you want CGFix.js to add a login link to the navigation bars if the user is not logged in. Set `loginGroupId` to your group's URL ID, which is the part of your website's URL marked `[groupId]`:

```
https://[schoolId].campusgroups.com/[groupId]/[pageId]/
```

You will also need to create a webpage on your group's website. It can be named "Logged In" or any other name. The important thing is to configure it:

- Ensure that the webpage's **Publish** checkbox is selected.
- Under the webpage's **Settings**:
    - Copy the **URL name** and set `loginCheckLoggedInPage` to that URL name.
    - Set a **Redirect url** to your group's home page — e.g., `/[groupId]/home/`. (optional)
- Under the webpage's **Access rights**:
    - Set **This content is accessible to:** to your school's users only. Typically, this is the second option.

CGFix.js will use the presence of this "Logged In" page to determine whether the user is logged in. After checking, CGFix.js will remove the link to the "Logged In" page from the navigation bars so that logged-in users will not see it.

Use `loginLinkText` to set the text of the login link.

You may also specify a `loginRedirectPage`. This refers to the **URL name** of the page to redirect the user to after they log in. It could be a members' page for instance. Delete it or leave it as `null` if you want to redirect the user to your group's home page.

### Restore mobile navigation hamburger

Set `restoreMobileNav` to `true` if you want CGFix.js to restore missing the mobile navigation hamburger arising from the _Edit HTML (advanced)_ feature.

Use `restoreMobileNavSelector` to specify the jQuery selector to retrieve the correct tag(s) to restore the navigation hamburger to. And use `restoreMobileNavHtml` to specify the HTML to restore.

Thereafter, set `restoreMobileNavAnchorSelector` to the jQuery selector for the anchor(s) to bind the toggle event. Set `restoreMobileNavMenuSelector` to the jQuery selector for the navigation menu. And set `restoreMobileNavMenuToggleClass` to a class or an array of classes to toggle on the navigation menu.

### Empty content in icon tags

Set `emptyIconTags` to `true` if you want CGFix.js to remove all content in `<i class="icon"></i>` tags.

## Versions

### v1.2.1 (2023-09-27)
- Applied patch to add event handling to the mobile navigation hamburger.

### v1.2.0 (2023-09-27)
- Added restore mobile navigation hamburger feature.
- Added empty content in icon tags feature.

### v1.1.0 (2023-09-03)
- Added login link feature.

### v1.0.0 (2023-05-15)
- First release.

## License

[MIT](https://github.com/isaacchua/cgfix/blob/master/LICENSE)
