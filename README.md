# Federated Library Pattern

Building off of the federated module examples of Jack Herrington.

## Motivation

I was getting sad that Typescript support for federated modules is a little clunky and a bit of a pain. I also wanted to see if there were more standards that could be developed around resilient federated modules.

## What is the Federated Library Pattern?

Here, a library, `federated_lib`, exports modules that are **automatically** bootstrapped with a remote and local version, alleviating consumers from needing to configure remote entries for it at all. The `federated_lib` knows where it will be hosted, so its webpack build bakes in that remote info with the module federation plugin. If the remote request fails, it falls back onto the actual component in the lib.

To accomplish this, the library has a couple of factory functions and HOCs (guess HOCs aren't dead? ...):

- `federatedFunction`
- `FederatedComponent`

Both of these create wrappers around a function (or Component) that can gracefully handle remote or local (bundled) versions of the module. `FederatedComponent` was inspired by the error boundary approach found here: https://www.youtube.com/watch?v=K-yQB9YGmgE&list=PLNqp92_EXZBLr7p7hn6IYa1YPNs4yJ1t1&index=19

Pros of this approach:

- Consumers use the modules as if they were just another library, and get updates **for free** at runtime
- Typescript just works (yay)
- Allows the library to have tighter control of remote entry versions requested, could cause less breakages on api changes

Caveats:

- I could only get this to work if the remote imports were dynamic (regular ES imports were causing webpack errors)

## Seeing it in action

### federated_lib

run the following:

```
# install deps
npm install
# build the actual npm library
npm run build:lib
# link to global for hooking up with the host
npm link
# start up the "App" which will generate the remote counterpart, that'd be deployed up to S3, etc.
npm start
```

On http://localhost:8080 you should see the header

### host

FIRST: Remove the entry for `federated_lib` in package.json (this isn't actually published anywhere so `npm install` will complain)

run:

```
# install deps
npm install
# link up the federated_lib as a dep
npm link federated_lib
```

Add back `federated_lib` to the package.json (or use yarn workspaces or turborepo)

run:

```
npm start
```

Voila! Typescript friendly federated modules, resilient, and no additional federated set up needed on the host!

To prove it's working, see the console, where it logs which component is being used (remote or fallback).
