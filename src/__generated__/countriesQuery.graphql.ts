/**
 * @generated SignedSource<<2bff53791c3eda2cf02798c6324f5066>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type countriesQuery$variables = {};
export type countriesQuery$data = {
  readonly country: {
    readonly name: string;
    readonly native: string;
  } | null;
};
export type countriesQuery = {
  response: countriesQuery$data;
  variables: countriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "code",
        "value": "BR"
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
    "storageKey": "country(code:\"BR\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "countriesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "countriesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0de0bb5f1f6b0a209a32e8eb83dc966a",
    "id": null,
    "metadata": {},
    "name": "countriesQuery",
    "operationKind": "query",
    "text": "query countriesQuery {\n  country(code: \"BR\") {\n    name\n    native\n  }\n}\n"
  }
};
})();

(node as any).hash = "9c55487be8123a699d6fdcf0a77c9912";

export default node;
