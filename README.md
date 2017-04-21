[![Build Status](https://travis-ci.org/gtvj/cloud-cdn.svg?branch=master)](https://travis-ci.org/gtvj/cloud-cdn)

# Exploring Cloud CDN options

## Purpose

To explore using webpack, Travis CI and AWS to create and manage a CDN for static assets (focusing on JavaScript initially)

## Things we've yet to solve/outstanding questions

* Would it be better if we had TravisCI deploy to a 'staging' bucket when, say, develop is pushed and to a 'live' bucket when, say, 'master' is pushed or to have AWS manage it by pushing from one bucket to another

## webpack

* Allows us to use ES2015 modules
* Provides the ability to compose specific bundles from modules

This is beneficial because we can have bundles composed for specific needs but share common components. 

See `webpack.config.js` to see the 'entry' points for which corresponding 'output' files are generated. An entry point will declare dependencies, which may themselves have dependencies. A dependency graph is created by webpack that manages all of this and creates a 'bundle' containing everything that's specified. 

While webpack is typically run from the command line (see the docs) we have declared an NPM script within `package.json` which allows us to run webpack with:
 
 * the `npm run build` command (for a single build)
 * the `npm run build-watch` command (to initiate a watch task)

### Installing webpack

Follow the current [webpack installation instructions](https://webpack.js.org/guides/installation/).

## Using S3

We are using S3 to store and serve the JavaScript that has been bundled by webpack. The steps involved in AWS to allow this were:

* Using IAM to create a user and group with the necessary policies (granting access to interact with S3)
* Creating an S3 bucket and granting the permissions to our user
* Enabling logging for the S3 bucket so that we can see what actions have taken place

## Using Travis

Travis CI provides a Continuous Integration mechanism. In our case this hooks into 'push' and 'pull request' events on the specified GitHub repository (because this has been activated in our Travis CI account) and then spins up a virtual machine, installs the necessary dependencies and then runs any scripts we specify. In our case this includes: 

* a 'build' step which runs webpack for us (generating the desired 'output' JavaScript files)
* a 'deploy' step which places the contents of our 'dist' directory into an S3 bucket

See `.travis.yml` for the details.

## Configuring Travis CI

Travis CI configuration is provided in `.travis.yml`. Note that this includes the secret access key for S3 **but that this has been encrypted with the Travis command line tool:

```bash
travis encrypt --add deploy.secret_access_key
```

