'use babel';

import TinyColor from 'tinycolor2';

import { NEUTRAL_RANGES, COLOR_RANGES,
       SATURATION_RANGES, LUMINOSITY_RANGES,
       OPACITY_RANGES } from './constants';

function getKey(value, ranges) {
  return Object.keys(ranges).find((key) => {
    return value > ranges[key].min && value <= ranges[key].max;
  });
}

export default class Color {

  constructor (input) {
    this.color = input; // input should be a tinycolor instance
    this.isValid = input instanceof TinyColor && input.isValid() != undefined ? input.isValid() : false;
    this.isNeutral = undefined;
    this.hue = undefined;
    this.saturation = undefined;
    this.luminosity = undefined;
    this.opacity = undefined;
  }

  setColor() {
    this.color = this.color.toHsl();
  }

  isNeutralColor() {
    const { h } = this.color;
    this.isNeutral = h === 0;
    return this.isNeutral;
  }

  getHue() {
    const { h, l } = this.color;

    if (this.isNeutral) {
      const key = getKey(l, NEUTRAL_RANGES);
      return NEUTRAL_RANGES[key].value;
    } else {
      const key = getKey(h, COLOR_RANGES);
      return COLOR_RANGES[key].value;
    }
  }

  getSaturation() {
    const { s } = this.color;
    const key = getKey(s, SATURATION_RANGES);
    return SATURATION_RANGES[key].value
  }

  getLuminosity() {
    const { l } = this.color;
    return LUMINOSITY_RANGES[getKey(l, LUMINOSITY_RANGES)].value;
  }

  getOpacity() {
    const { a } = this.color;
    return OPACITY_RANGES[getKey(a, OPACITY_RANGES)].value;
  }

  init() {
    this.setColor();
    this.isNeutralColor();
    this.hue = this.getHue();
    this.saturation = this.getSaturation();
    this.luminosity = this.getLuminosity();
    this.opacity = this.getOpacity();
  }

  getDescription() {
    const { hue, saturation, luminosity, opacity } = this;

    let output = '';
    if (this.isNeutral) output = `${luminosity} ${hue}`;
    else output = `${luminosity}, ${saturation} ${hue}`;
    if (opacity.length) output += `; ${opacity}`;

    return output;
  }

};
