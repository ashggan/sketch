import constants from "./common/constants.js";
import features from "./common/features.js";
import { readFileSync, writeFileSync } from "fs";
import utils from "./common/utlls.js";

const samples = JSON.parse(readFileSync(constants.SAMPLES_JSON));

let id = 0;
for (const sample of samples) {
  const paths = JSON.parse(
    readFileSync(constants.JSON_DIR + "/" + sample.id + ".json")
  );

  sample.point = [
    features.getPathsCount(paths),
    features.getPointscount(paths),
  ];
  id++;
  utils.printProgress(id, samples.length);
}
const featureNames = ["Path count", "Point count"];

writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((s) => {
      return {
        point: s.point,
        label: s.label,
      };
    }),
  })
);

writeFileSync(
  constants.FEATURES_JS,
  `const features = ${JSON.stringify({ featureNames, samples })};`
);
