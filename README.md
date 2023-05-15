# CGFix.js

A JavaScript module to fix issues that arise on CampusGroups group websites.

## Features

1. Remove blank lines (`all-page-modals`). These are basically spacings that CampusGroups automatically adds to the page after every edit on the Website Builder. This causes certain sections to increasingly get longer with more whitespace over time. Absolutely essential if the page gets many edits.

2. Enable dynamic gallery features:
    - Hide filter drop-down.
    - Delete filtered-out hidden images.
    - Sort images by alt name (based on the file name by default) instead of CampusGroups own default sorting by upload date.

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
    galleryEnableSortByAltName: true
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

## License

[MIT](https://github.com/isaacchua/cgfix/blob/master/LICENSE)
