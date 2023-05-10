import { readFileSync, readdirSync, writeFileSync } from "fs";
import draw from "../common/draw.js";
import { createCanvas } from "canvas";

const constants = {};
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

constants.DATA_DIR = "../data";
constants.RAW_DATA = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.IMAGE_DIR = constants.DATASET_DIR + "/img";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.SAMPLES_DIR = constants.DATA_DIR + "/samples.json";

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
  }
  id++;
});
console.log(samples.length);

writeFileSync(constants.SAMPLES_DIR, JSON.stringify(samples));

function generate_image(dir, paths) {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  draw.paths(ctx, paths);

  const buffer = canvas.toBuffer("image/png");
  writeFileSync(dir, buffer);
}
