# task

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd task`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


## Description:
  This is Ember Project supproted by couchdb in backend.In this project i have made a basic website which supports signing up and logging in using sessions stored in couchdb also the data stored in couchdb.Later after logging in you will be able to create ,read,update or delete posts.
  In this project i have made use of addons like ember-cli-sofa and ember-pouch both of which help in connecting to couch and carrying transactions.
  I have also made use of localstorage addon to store error messages for displaying it to user.
  The database names which are used in the project are:
  "test" : Database to store user details on registeration.
  "post" : Database to store all the post which we create.
  session_eu-app : Database to store all the sessions when user signs in or logs in.
  Installing the addons commands :
  `ember install ember-cli-sofa`
  `ember install ember-bootstrap`
  `ember install ember-pouch`
  `ember install ember-local-storage`

  This is my ember project.
