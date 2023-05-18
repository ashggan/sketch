import { readFileSync, readdirSync, writeFileSync } from "fs";
import draw from "./common/draw.js";
import { createCanvas } from "canvas";
import constants from "./common/constants.js";
import utils from "./common/utlls.js";

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");
const filenames = readdirSync(constants.RAW_DATA);
const samples = [];
let id = 1;

filenames.forEach((fn) => {
  const content = readFileSync(constants.RAW_DATA + "/" + fn);

  const { student, session, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      name: student,
      user_id: session,
      label,
    });
    const paths = drawings[label];
    writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths)
    );

    generate_image(constants.IMAGE_DIR + "/" + id + ".png", paths);

    utils.printProgress(id, filenames.length * 8);
    id++;
  }
});

writeFileSync(constants.SAMPLES_JSON, JSON.stringify(samples));
writeFileSync(
  constants.SAMPLES_JS,
  "const samples = " + JSON.stringify(samples) + ";"
);

function generate_image(dir, paths) {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  draw.paths(ctx, paths, "black");
  const buffer = canvas.toBuffer("image/png");
  writeFileSync(dir, buffer);
}
