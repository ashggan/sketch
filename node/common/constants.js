const constants = {};

// directories
constants.DATA_DIR = "../data";
constants.RAW_DATA = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.IMAGE_DIR = constants.DATASET_DIR + "/img";
constants.JSON_DIR = constants.DATASET_DIR + "/json";

// samples
constants.SAMPLES_JSON = constants.DATA_DIR + "/samples.json";
constants.JS_OBJECT = "./common/js_objects";
constants.SAMPLES_JS = constants.JS_OBJECT + "/samples.js";

// features
constants.FEATURES = constants.DATASET_DIR + "/features.json";
constants.FEATURES_JS = constants.JS_OBJECT + "/features.js";

export default constants;
