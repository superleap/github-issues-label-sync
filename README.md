# :electric_plug::package: github-issues-label-sync [![License](http://img.shields.io/:license-BSD2-blue.svg?style=flat-square)](https://opensource.org/licenses/BSD-2-Clause) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) 

[![current version](https://img.shields.io/npm/v/github-issues-label-sync.svg?style=flat-square)](https://www.npmjs.com/package/github-issues-label-sync) [![current version](https://img.shields.io/node/v/github-issues-label-sync.svg?style=flat-square)](https://www.npmjs.com/package/github-issues-label-sync) [![GitHub issues](https://img.shields.io/github/issues/superleap/github-issues-label-sync.svg)](https://github.com/superleap/github-issues-label-sync/issues) [![Join the chat at https://gitter.im/superleap/github-issues-label-sync](https://badges.gitter.im/superleap/github-issues-label-sync.svg)](https://gitter.im/superleap/github-issues-label-sync?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](http://img.shields.io/travis/superleap/github-issues-label-sync.svg?style=flat-square)](https://travis-ci.org/superleap/github-issues-label-sync) [![Dependency Status](https://dependencyci.com/github/superleap/github-issues-label-sync/badge)](https://dependencyci.com/github/superleap/github-issues-label-sync) [![Dependency Status](https://david-dm.org/superleap/github-issues-label-sync.svg)](https://david-dm.org/superleap/github-issues-label-sync) [![devDependency Status](https://david-dm.org/superleap/github-issues-label-sync/dev-status.svg)](https://david-dm.org/superleap/github-issues-label-sync#info=devDependencies) 

[![codecov](https://codecov.io/gh/superleap/github-issues-label-sync/branch/master/graph/badge.svg)](https://codecov.io/gh/superleap/github-issues-label-sync) [![bitHound Overall Score](https://www.bithound.io/github/superleap/github-issues-label-sync/badges/score.svg)](https://www.bithound.io/github/superleap/github-issues-label-sync) [![bitHound Dependencies](https://www.bithound.io/github/superleap/github-issues-label-sync/badges/dependencies.svg)](https://www.bithound.io/github/superleap/github-issues-label-sync/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/superleap/github-issues-label-sync/badges/devDependencies.svg)](https://www.bithound.io/github/superleap/github-issues-label-sync/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/superleap/github-issues-label-sync/badges/code.svg)](https://www.bithound.io/github/superleap/github-issues-label-sync)


## Overview

> **part of the superleap.xyz open source project management suite**

> **create a config json containing pairs of label/colour**

> **import repo labels and add to version control**

> **CLI version in progress**

## Requirements

In order to run the `github-issues-label-sync` package you will need the following things:

- a github OAuth token otherwise called personal access token. You can do this here: [github.com/settings/tokens](https://github.com/settings/tokens)
- an environment running at least node v4
- either `npm` or `git` installed

## Installation

There are multiple ways to run this module:

### NPM

Install GitHub Issues Label Sync with [NPM](https://www.npmjs.com/) or add 
to your package.json:

```
npm i github-issues-label-sync
```

### GitHub

```
git clone https://github.com/superleap/github-issues-label-sync.git
```

## Usage

Before you can use this module you have to create a configuration array and 
then require the package inside your script:

```
let config = {
  "github": {
    "user": "superleap",
    "repo": "github-issues-label-sync",
    "token": "dab5ae868be49ec9179b34d2532d699a603f8be0",
    "options": {
      "debug": true
    }
  }
};
let {user, repo, token, options} = config.github;
let githubSync = new (require('github-issues-label-sync'))
    (options, user, repo, token);
    
```

All methods have been `promisified` using bluebird. They will generically 
return an array of affected results on success and a http error on failure.

The class currently handles generic errors such as duplicate records as 
warning messages and only raises exceptions when it is impossible to finish 
the requested action. 

If you encounter such errors don't hesitate to open an issue as the class 
was tested with most common scenarios in mind. 

## Configuration

### `<Label>` typedef 

This package doesn't come with a default configuration.

As long as you can export your data structure to GithubIssuesLabelSync.Label 
you should be set to go.

```
let Label = {
    "name": "GH Review: accepted", 
    "color": "009800" 
};
```

The name property refers to the label name and the color property should 
be set to the color of the label as a hex code without the leading hash tag.

### example .labels.js

Here is an example of a custom structure config - this will be default in 
future versions:

```
let labels = {
  "categories": [
    {
      "name": "GH Review",
      "labels": [
        {
          "name": "accepted",
          "color": "009800"
        },
        {
          "name": "breaking changes",
          "color": "a33cd6"
        },
        {
          "name": "needs-revision",
          "color": "e11d21"
        },
        {
          "name": "on hold",
          "color": "bfdadc"
        },
        {
          "name": "review-needed",
          "color": "fbca04"
        },
        {
          "name": "shipped",
          "color": "d4c5f9"
        }
      ]
    },
    {
      "name": "Resolution",
      "labels": [
        {
          "name": "duplicate",
          "color": "ccc"
        },
        {
          "name": "invalid",
          "color": "e6e6e6"
        },
        {
          "name": "unresolved",
          "color": "fef2c0"
        },
        {
          "name": "wontfix",
          "color": "fff"
        }
      ]
    },
    {
      "name": "Semver",
      "labels": [
        {
          "name": "exempt",
          "color": "1d76db"
        },
        {
          "name": "major",
          "color": "b60205"
        },
        {
          "name": "minor",
          "color": "fbca04"
        },
        {
          "name": "patch",
          "color": "0e8a16"
        },
        {
          "name": "premajor",
          "color": "e99695"
        }
      ]
    },
    {
      "name": "Status",
      "labels": [
        {
          "name": "new",
          "color": "006b75"
        },
        {
          "name": "reverted",
          "color": "d93f0b"
        },
        {
          "name": "unconfirmed",
          "color": "d4c5f9"
        }
      ]
    },
    {
      "name": "Type",
      "labels": [
        {
          "name": "bug",
          "color": "fc2929"
        },
        {
          "name": "enhancement",
          "color": "84b6eb"
        },
        {
          "name": "feature-request",
          "color": "c7def8"
        },
        {
          "name": "question",
          "color": "cc317c"
        },
        {
          "name": "regression",
          "color": "e11d21"
        }
      ]
    }
  ]
};
let labels = [];

Array.from(config).categories).forEach((category) => {
    category.labels.forEach((label) => {
        label.name = `${category.name}: ${label.name}`;
        labels.push(label);
    });
});

module.exports = labels;

```

## Examples

These are snippets of working demos found in `./examples` folder.

### Create a label

```
githubIssuesLabelSync.createLabel(labels[0]).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Create multiple labels

```
githubIssuesLabelSync.createLabels(labels).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Update a label

```
githubIssuesLabelSync.updateLabel(labels[0]).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Update multiple labels

```
githubIssuesLabelSync.updateLabels(labels).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Delete a label

```
githubIssuesLabelSync.deleteLabel(label).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Delete multiple labels

```
githubIssuesLabelSync.deleteLabels(labels).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Fetch all labels

```
githubIssuesLabelSync.getLabels().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Purge all labels

```
githubIssuesLabelSync.purgeLabels().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

### Import all labels

```
githubIssuesLabelSync.importLabels(labels, false).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error.toJSON());
});
```

## Contribute

We'd love to get contributions from you! Once you are up and running, take a look at the [contributing docs](https://github.com/superleap/github-issues-label-sync/blob/master/CONTRIBUTING.md) to see how to get your changes merged in.

## Changelog

See the [release page](https://github.com/superleap/github-issues-label-sync/releases).

## License

    Copyright (c) 2016, TED Vortex (Teodor Eugen Duțulescu)
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without 
    modification, are permitted provided that the following conditions 
    are met:
    
    1. Redistributions of source code must retain the above copyright 
    notice, this list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above 
    copyright notice, this list of conditions and the following 
    disclaimer in the documentation and/or other materials provided 
    with the distribution.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE 
    COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
    INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
    HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
    STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
    ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
