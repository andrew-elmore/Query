export default {
  "id": "appoCksr6eNflbkRA",
  "name": "Products",
  "tables": [
      {
          "name": "Products",
          "id": "tblUw8ihYgeWh47N8",
          "fields": [
              {
                  "id": "fldnh6UxdVajZ7rjT",
                  "name": "TL_ID2"
              },
              {
                  "id": "fldIGKuFAz61yK8pj",
                  "name": "PRODUCT"
              },
              {
                  "id": "fldrTqeM5Sp158Xqq",
                  "name": "UNFI"
              }
          ],
          "records": [
              {
                  "id": "reczAiagCt8jeArSB",
                  "cells": {
                      "fldnh6UxdVajZ7rjT": "ABC-12-4234",
                      "fldIGKuFAz61yK8pj": "test 1",
                      "fldrTqeM5Sp158Xqq": [
                          {
                              "id": "recBrMwXB0eK9Bc91",
                              "name": "23445"
                          }
                      ]
                  }
              },
              {
                  "id": "recOhvUf989dmoh92",
                  "cells": {
                      "fldnh6UxdVajZ7rjT": "ABC-12-2456",
                      "fldIGKuFAz61yK8pj": "test 2",
                      "fldrTqeM5Sp158Xqq": [
                          {
                              "id": "recl72A5k7Q4gPc3T",
                              "name": "33424"
                          }
                      ]
                  }
              },
              {
                  "id": "recgA7St2m8aJ6U9f",
                  "cells": {
                      "fldnh6UxdVajZ7rjT": "ABC-12-9864",
                      "fldIGKuFAz61yK8pj": "test 3",
                      "fldrTqeM5Sp158Xqq": [
                          {
                              "id": "recvhwVdSJCbGJQuU",
                              "name": "22344"
                          }
                      ]
                  }
              }
          ]
      },
      {
          "id": "tbl08lD2U53OT9bBz",
          "name": "UNFI",
          "fields": [
              {
                  "id": "fldb2WLxhQCN1zYBl",
                  "name": "DISTB_ID"
              },
              {
                  "id": "fldhMmSkNZdTob9sk",
                  "name": "TL_ID2"
              },
              {
                  "id": "flduF1LU50Vc0RUiG",
                  "name": "PRODUCT (from TL_ID2)"
              }
          ],
          "records": [
              {
                  "id": "recBrMwXB0eK9Bc91",
                  "cells": {
                      "fldb2WLxhQCN1zYBl": "23445",
                      "fldhMmSkNZdTob9sk": [
                          {
                              "id": "reczAiagCt8jeArSB",
                              "name": "ABC-12-4234"
                          }
                      ],
                      "flduF1LU50Vc0RUiG": [
                          {
                              "linkedRecordId": "reczAiagCt8jeArSB",
                              "value": "test 1"
                          }
                      ]
                  }
              },
              {
                  "id": "recl72A5k7Q4gPc3T",
                  "cells": {
                      "fldb2WLxhQCN1zYBl": "33424",
                      "fldhMmSkNZdTob9sk": [
                          {
                              "id": "recOhvUf989dmoh92",
                              "name": "ABC-12-2456"
                          }
                      ],
                      "flduF1LU50Vc0RUiG": [
                          {
                              "linkedRecordId": "recOhvUf989dmoh92",
                              "value": "test 2"
                          }
                      ]
                  }
              },
              {
                  "id": "recvhwVdSJCbGJQuU",
                  "cells": {
                      "fldb2WLxhQCN1zYBl": "22344",
                      "fldhMmSkNZdTob9sk": [
                          {
                              "id": "recgA7St2m8aJ6U9f",
                              "name": "ABC-12-9864"
                          }
                      ],
                      "flduF1LU50Vc0RUiG": [
                          {
                              "linkedRecordId": "recgA7St2m8aJ6U9f",
                              "value": "test 3"
                          }
                      ]
                  }
              }
          ]
      }
  ]
}

