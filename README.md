[![CI](https://github.com/kaiosilveira/encapsulate-record-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/encapsulate-record-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

# Encapsulate Record

**🚧 This repo is still a work in progress. Please stay tuned for new updates**

Encapsulation is one of the core concepts of Object-Oriented Programming and is often related to well-modularized code. With encapsulation, we are in full control of our data structures, being sure that any changes to it will have to go through its wrapper, allowing for expansion and gradual modification and deprecation. When working with a data record, it is often easy to loose sight of how it's being accessed and mofidied throughout our application. This refactoring suggests a solution to this problem and provide a step-by-step buide on how to encapsulate our existing raw data records.

## Working examples

We're going to discuss two working examples here: a simple case, with a shallow data record, and a more complicated case, with a nested record.

### Simple case

The simple case consists of a shallow `organization` POJO (Plain Old Javascript Object). We're going to encapsulate it in a class and update its callers to consume the new structure. We start with the following code:

**Before**

```javascript
const organization = { name: 'Acme Gooseberries', country: 'GB' };
```

And, after going through the refactoring steps detailed in the next section, we have the following code as a result:

**After**

```javascript
export class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  set name(aString) {
    this._name = aString;
  }

  get name() {
    return this._name;
  }
}
```

#### Test suite

To make sure each step of our refactoring session won't break anything, unit tests were put in place for the fictional clients of our `organization` object. They're extremely simple and only validate the resulting output of each client module:

Client 1:
```javascript
describe('client1', () => {
  it('should create a header using the organization name', () => {
    expect(result).toBe('<h1>Acme Gooseberries</h1>');
  });
});
```

Client 2:
```javascript
describe('client2', () => {
  it('should update the organization name', () => {
    expect(result).toBe('Metamorphosis Inc');
  });
});
```

This is all we need to get started.

#### Steps

Our first refactoring step is encapsulating our `organization` variable into a function and updating the callers accordingly, so our changes are centralized.

```diff
diff --git a/src/client1/index.js b/src/client1/index.js
@@ -1,3 +1,3 @@
-import { organization } from '../index.js';
+import { getRawDataOfOrganization } from '../index.js';

-export const result = `<h1>${organization.name}</h1>`;
+export const result = `<h1>${getRawDataOfOrganization().name}</h1>`;

diff --git a/src/client2/index.js b/src/client2/index.js
@@ -1,6 +1,6 @@
-import { organization } from '../index.js';
+import { getRawDataOfOrganization } from '../index.js';

 const newName = 'Metamorphosis Inc';
-organization.name = newName;
+getRawDataOfOrganization().name = newName;

-export const result = organization.name;
+export const result = getRawDataOfOrganization().name;

diff --git a/src/index.js b/src/index.js
@@ -1 +1,5 @@
 export const organization = { name: 'Acme Gooseberries', country: 'GB' };
+
+export function getRawDataOfOrganization() {
+  return organization;
+}
```

We will also need to introduce an `Organization` class. Our goal is to have all the accesses to `organization` going through this class.

```diff
diff --git a/src/organization.js b/src/organization.js
+++ b/src/organization.js
@@ -0,0 +1,5 @@
+export class Organization {
+  constructor(data) {
+    this._data = data;
+  }
+}
```

With the class in place, we can replace our `organization` record with a class instance, updating its wrapper function. We'll also introduce a method called `getOrganization` to provide a way to access the full class instance instead of only its raw data.

```diff
diff --git a/src/index.js b/src/index.js
@@ -1,5 +1,14 @@
-export const organization = { name: 'Acme Gooseberries', country: 'GB' };
+import { Organization } from './organization';

+export const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });
+
+/**
+ * @deprecated use getOrganization instead
+ */
 export function getRawDataOfOrganization() {
+  return organization._data;
+}
+
+export function getOrganization() {
   return organization;
 }
```

We can also mark our `getRawDataOfOrganization` as deprecated, as our goal is to move clients to the new function:

![Deprecated warning set for getRawDataOfOrganization](./assets/deprecated-warning.png)

Clients will see the function with a strikethrought line now, which is a good visual effect to discourage people of using it:

![Deprecated warning from a client's perspective](./assets/deprecated-warning.png)


Now, we need a getter and a setter for our `name` field, since it's being accessed and modified externally.

```diff
diff --git a/src/organization.js b/src/organization.js
@@ -2,4 +2,12 @@ 
export class Organization {
   constructor(data) {
     this._data = data;
   }
+
+  set name(aString) {
+    this._data.name = aString;
+  }
+
+  get name() {
+    return this._data.name;
+  }
 }
```

Moving on, we need to update the clients to use class variation of the `organization`:

```diff
diff --git a/src/client1/index.js b/src/client1/index.js
@@ -1,3 +1,3 @@
-import { getRawDataOfOrganization } from '../index.js';
+import { getOrganization } from '../index.js';

-export const result = `<h1>${getRawDataOfOrganization().name}</h1>`;
+export const result = `<h1>${getOrganization().name}</h1>`;

diff --git a/src/client2/index.js b/src/client2/index.js
@@ -1,6 +1,7 @@
-import { getRawDataOfOrganization } from '../index.js';
+import { getOrganization } from '../index.js';

 const newName = 'Metamorphosis Inc';
-getRawDataOfOrganization().name = newName;

-export const result = getRawDataOfOrganization().name;
+getOrganization().name = newName;
+
+export const result = getOrganization().name;
```

And then we can remove the deprecated (and now unused) `getRawDataOfOrganization` function:
```diff
diff --git a/src/index.js b/src/index.js
@@ -2,13 +2,6 @@ import { Organization } from './organization';

 export const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

-/**
- * @deprecated use getOrganization instead
- */
-export function getRawDataOfOrganization() {
-  return organization._data;
-}
-
 export function getOrganization() {
   return organization;
 }
```

Finally, we can fold our data object into class instance fields at `Organization` class, so our internal representation is more concise:

```diff
diff --git a/src/organization.js b/src/organization.js
@@ -1,13 +1,14 @@
 export class Organization {
   constructor(data) {
-    this._data = data;
+    this._name = data.name;
+    this._country = data.country;
   }

   set name(aString) {
-    this._data.name = aString;
+    this._name = aString;
   }

   get name() {
-    return this._data.name;
+    return this._name;
   }
 }
```

And that's it! Now all access to our `organizaton` object will go through our `Organization` class.

#### Commit history

Below there's the commit history for the steps detailed above.
| Commit SHA                                                                                                                | Message                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [9ffaf23](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/9ffaf23b552026e795891af7f5c17920c077419a) | encapsulate organization variable using a function                |
| [6f8588c](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/6f8588c16e7739a627329ab32d598f17324bf91c) | introduce Organization class                                      |
| [f5f48e0](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/f5f48e00909080b38c01998f83876275a972a053) | replace raw organization record with a class instance             |
| [b61a76d](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/b61a76dfeea467ceaa2b2be336534048db19fdaa) | introduce getter and setter for name at Organization class        |
| [a24103a](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/a24103ae66666f2c99f0e1f55981a714d9330179) | update clients to use class variation of organization getter      |
| [61664b0](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/61664b0a859d94a7dae04fa5b680366da7631cf2) | remove deprecated and unused getRawDataOfOrganization function    |
| [1836e62](https://github.com/kaiosilveira/encapsulate-record-refactoring/commit/1836e62c2bb78ea213840971bb84bf7a212bbe03) | fold data object into class instance fields at Organization class |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/encapsulate-record-refactoring/commits/main).
