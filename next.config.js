module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return {
      ...config,
      // From this discussion:
      // https://github.com/googleapis/google-auth-library-nodejs/issues/150#issuecomment-488780989
      node: {
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        ...config.node,
        fs: "empty",
        child_process: "empty",
        net: "empty",
        tls: "empty"
      }
    }
  }
}
