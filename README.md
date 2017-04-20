[![Build Status](https://travis-ci.org/gtvj/cloud-cdn.svg?branch=master)](https://travis-ci.org/gtvj/cloud-cdn)

# Purpose

To explore: 

* Using [webpack 2](https://webpack.js.org) to:
    * Provide support for ES2015 with:
        * JavaScript modules that can be composed into discrete modules for core services
        * Transpile to ES5 for production

## Installing webpack

Follow the current [webpack installation instructions](https://webpack.js.org/guides/installation/). Having installed webpack locally you can see a list of valid CLI commands with: 

```bash
./node_modules/.bin/webpack --help # Shows a list of valid cli commands
```

## Configuring Travis CI

Travis CI configuration is provided in `.travis.yml`. Note that this includes the secret access key for S3 **but that this has been encrypted with the Travis command line tool:

```bash
travis encrypt --add deploy.secret_access_key
```

