const features = {};

features.getPathsCount = (paths) => paths.length;

features.getPointscount = (paths) => {
  const points = paths.flat();
  return points.length;
};

export default features;
