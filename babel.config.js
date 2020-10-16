module.exports = function(api) {
    api.cache(false);
    return {
        "plugins": ["@babel/plugin-transform-react-jsx"],
        "presets": ["@babel/preset-react", "@babel/preset-env"]
    }
};