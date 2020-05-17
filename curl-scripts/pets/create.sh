#!/bin/bash

API="http://localhost:4741"
API2="https://protected-oasis-12032.herokuapp.com"
URL_PATH="/pets"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "pet": {
      "name": "'"${NAME}"'",
      "breed": "'"${BREED}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
