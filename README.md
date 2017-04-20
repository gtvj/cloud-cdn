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

### What webpack does

* Allows us to use ES2015 modules
* Provides the ability to compose specific bundles from modules

This is beneficial because we can have bundles for specific applications which are composed for their own specific needs but share common components.

### How it does this

See `webpack.config.js` to see the 'entry' points for which corresponding 'output' files are generated. An entry point will declare dependencies, which may themselves have dependencies. A dependency graph is created by webpack that manages all of this and creates a 'bundle' containing everything that's specified. 

## Configuring S3 for our purposes

The steps involved in AWS to allow this were:

* Using IAM to create a user and group with the necessary policies (granting access to interact with S3)
* Creating an S3 bucket and granting the permissions to our user


## Configuring Travis CI

Travis CI configuration is provided in `.travis.yml`. Note that this includes the secret access key for S3 **but that this has been encrypted with the Travis command line tool:

```bash
travis encrypt --add deploy.secret_access_key
```

### What Travis CI does

Travis CI provides a Continuous Integration mechanism. In our case this hooks into 'push' and 'pull request' events on the specified GitHub repository (because this has been activated in our Travis CI account) and then spins up a virtual machine, installs the necessary dependencies and then runs any scripts we specify. In our case this includes: 

* a 'build' step which runs webpack for us (generating the desired 'output' JavaScript files)
* a 'deploy' step which places the contents of our 'dist' directory into an S3 bucket

See `.travis.yml` for the details.

