# VARIOUS NOTES

------------------

## CSS

- **Extrinsic** vs **intrinsic** sizing: i.e. *width* can be either, if set to *min-content*, will adapt to elements inside (intrinsic). The min-content keyword tells the box to only be as wide as the intrinsic minimum width of its content.

- **overflow**: when a box content is larger than the box

- **box**: margin-border-padding-content-padding-border-margin. Note that the margin doens't change the actual size of the box

- **content-box**: by default -> *box-sizing*. If so, margin & padding are added to the width and heith. Another way is *border-box*. This applies the width to the border box instead of the content box. The padding and the border will be pushed in.

- **selector**: \*: selects everything. section: selects every *section* element. .: selects a className. #: selects an id. \[*data-type='primary'*\]: selects elements that have the given html attribute, note that \[*data-type*\] will select elements that have this attribute regardless of its value. Commas (,) can make groupped selections: *div, .my-class* for example.

- **pseudo-classes**: *a:hover* -> depends on the state.

- **pseudo-element**: *.class::before* ->  this will insert things before the element. Can also be used to change specific parts of elements, such as *li::marke{ color: red }* or *::selection* to style contenet highlighted by user.

- **div p**: will select pars that are in divs.

## Docker

### create image

```
docker build -t <name> <path>
```

### create container

### network

- create network:
``` 
docker network create <name> --subnet=<range, i.e. 127.0.0.0/16>
```