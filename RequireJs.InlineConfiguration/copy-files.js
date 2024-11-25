const { error } = require("console");
const fs = require("fs");
const path = require("path");

const bundle_folder = "wwwroot/bundles";
const libs_folder = "wwwroot/lib/requirejs";

const operations = [
  {
    src: "node_modules/knockout/build/output/knockout-latest.js",
    name: "knockout",
    dest: bundle_folder,
  },
  {
    src: "node_modules/survey-core/survey.core.min.js",
    name: "survey-core",
    dest: bundle_folder,
  },
  {
    src: "node_modules/survey-core/themes/index.min.js",
    name: "survey-core/themes",
    dest: bundle_folder,
  },
  {
    src: "node_modules/survey-knockout-ui/survey-knockout-ui.min.js",
    name: "survey-knockout-ui",
    dest: bundle_folder,
  },
  {
    src: "node_modules/survey-creator-core/survey-creator-core.min.js",
    name: "survey-creator-core",
    dest: bundle_folder,
  },
  {
    src: "node_modules/survey-creator-knockout/survey-creator-knockout.min.js",
    name: "survey-creator-knockout",
    dest: bundle_folder,
  },
  {
    src: "node_modules/requirejs/require.js",
    dest: libs_folder,
  },
];

const errors = [];

operations.forEach((copyOperation) => {
  const src = path.join(__dirname, copyOperation.src);
  const dest = path.join(__dirname, copyOperation.dest, path.basename(src));
  try {
    fs.copyFileSync(src, dest);
    console.log(`✅ Success for >>${copyOperation.name}<< | ${path.basename(src)} was copied to folder "${path.basename(copyOperation.dest)}"`);
  }
  catch {
    const errorMessage = `❗️ Error:   ${path.basename(src)} was NOT copied to folder "${path.basename(copyOperation.dest)}"`;
    errors.push(errorMessage);
    console.warn(errorMessage);
  }
});

if (!errors?.length) {
  console.log(
    "\r\n======\r\n🚀 All files are migrated. Please start the ASP.NET project to test the sample\r\n======"
  );
} else {
  console.log(
    "\r\n======\r\n☢️ There were errors during migration. Please execute `npm install` and try again\r\n======"
  );
}
