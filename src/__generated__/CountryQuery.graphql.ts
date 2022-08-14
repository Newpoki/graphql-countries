/**
 * @generated SignedSource<<c177dc46a827afdd7c2f497e473b300e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CountryQuery$variables = {
  code: string;
};
export type CountryQuery$data = {
  readonly country: {
    readonly name: string;
    readonly native: string;
  } | null;
};
export type CountryQuery = {
  response: CountryQuery$data;
  variables: CountryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "code"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "code",
        "variableName": "code"
      }
    ],
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "country",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "native",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CountryQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CountryQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d85a5faf03b2d27788707678a63e9b06",
    "id": null,
    "metadata": {},
    "name": "CountryQuery",
    "operationKind": "query",
    "text": "query CountryQuery(\n  $code: ID!\n) {\n  country(code: $code) {\n    name\n    native\n  }\n}\n"
  }
};
})();

(node as any).hash = "327cad65d2ab09a621a4700fb41bc4ab";

export default node;
