# CG Fix

A JavaScript module to fix issues that arise on CampusGroups group websites.

### Features

1. Remove `all-page-modals`. These are basically spacings that CampusGroups automatically adds to the page after every edit on the Website Builder. This causes certain sections to increasingly get longer with more whitespace over time. Absolutely essential if the page gets many edits.

2. Enable dynamic gallery features:
    - Hide filter drop-down.
    - Delete filtered-out hidden images.
    - Sort images by alt name (based on the file name by default) instead of CampusGroups own default sorting by upload date.

### Installation

1. Click on the **Website Settings** button on your group's website admin panel.
2. Paste the contents of [cgfix.js](https://github.com/isaacchua/cgfix/blob/master/cgfix.js) between `<script></script>` tags in the **Website Custom JavaScript** box:
```
<script>
// CGFix.js - https://github.com/isaacchua/cgfix
let cgfix = { ...
</script>
```

### License

[MIT](https://github.com/isaacchua/cgfix/blob/master/LICENSE)
