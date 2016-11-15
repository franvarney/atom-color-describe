'use babel';

// key, string, min + max luminosity
const NEUTRALS = [
  ['BLACK', 'black', -0.01, .11],
  ['NEARBLACK', 'near black', .11, .2],
  ['GREY', 'grey', 0.2, 0.95],
  ['NEARWHITE', 'near white', 0.95, .99],
  ['WHITE', 'white', .99, 1]
];

// key, string, min + max range of color
const COLORS = [
  ['REDSTART', 'red', 0, 15],
  ['ORANGE', 'orange', 15, 45],
  ['YELLOW', 'yellow', 45, 75],
  ['LIME', 'lime', 75, 105],
  ['GREEN', 'green', 105, 135],
  ['TURQUOISE', 'turquoise', 135, 165],
  ['CYAN', 'cyan', 165, 195],
  ['COBALT', 'cobalt', 195, 225],
  ['BLUE', 'blue', 225, 255],
  ['VIOLET', 'violet', 255, 285],
  ['MAGENTA', 'magenta', 285, 315],
  ['CRIMSON', 'crimson', 315, 345],
  ['REDEND', 'red', 345, 360]
];

// key, string, min + max range of saturation
const SATURATION = [
  ['NEUTRAL', '', -.01, .1],
  ['DESATURATED', 'desaturated', .1, .2],
  ['MUTED', 'muted', .2, .4],
  ['PALE', 'pale', .4, .5],
  ['SOFT', 'soft', .5, .7],
  ['STRONG', 'strong', .7, .9],
  ['SATURATED', 'saturated', .9, .93],
  ['NEARPURE', 'near pure', .93, .97],
  ['PURE', 'pure', .97, 1]
];

// key, string, min + max range of lightness
const LUMINOSITY = [
  ['VERYDARK', 'very dark', -0.01, .15],
  ['DARK', 'dark', .15, .25],
  ['MEDIUMDARK', 'medium-dark', .25, .45],
  ['MEDIUM', 'medium', .45, .65],
  ['MEDIUMLIGHT', 'medium-light', .65, .75],
  ['LIGHT', 'light', .75, .85],
  ['VERYLIGHT', 'very light', .85, 1],
];

// key, string, min + max range of opacity
const OPACITY = [
  ['OPAQUE', 'see-through (or fully opaque)', -.01, .1],
  ['VERY', 'very opaque', .1, .2],
  ['SOMEWHAT', 'somewhat opaque', .2, .8],
  ['LITTLE', 'little opaque', .8, .99],
  ['SOLID', '', .99, 1],
];

function build(ranges, range) {
  const [ key, value, min, max ] = range;
  ranges[key] = { value, min, max };
  return ranges;
}

export default {
  NEUTRAL_RANGES: NEUTRALS.reduce(build, {}),
  COLOR_RANGES: COLORS.reduce(build, {}),
  SATURATION_RANGES: SATURATION.reduce(build, {}),
  LUMINOSITY_RANGES: LUMINOSITY.reduce(build, {}),
  OPACITY_RANGES: OPACITY.reduce(build, {})
};
