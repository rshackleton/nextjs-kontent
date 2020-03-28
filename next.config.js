require('dotenv').config({
  path: 'local.env',
});

exports.default = {
  env: {
    KC_PREVIEW_KEY: process.env.KC_PREVIEW_KEY,
    KC_PROJECT_ID: process.env.KC_PROJECT_ID,
  },
};
