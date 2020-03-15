import { getValueIfDefined } from "../utils";

/* const colorParser = color => {
  const config = color.trim().split(",");

  if (config.length > 1) {
    const colors = [];
    const radial = config[0] === "radial";
    const startIndex = radial ? 1 : 0;
    for (let i = startIndex; i < config.length; i++) {
      const colorConfig = config[i].trim().split(" ");
      colors.push({
        color: colorConfig[0],
        offset: colorConfig[1],
        opacity: getValueIfDefined(colorConfig[2]) || 1
      });
    }
    return {
      gradient: {
        radial: config[0] === "radial",
        colors
      }
    };
  }
  return color;
}; */

const lineModeParser = lineMode => {
  const lineModeConfig = lineMode.trim().split(" ");
  return {
    mode: lineModeConfig[0],
    offset: getValueIfDefined(lineModeConfig[1]) || 0
  };
};

export { lineModeParser };
