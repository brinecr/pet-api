#!/bin/bash

API="http://localhost:4741"
API2="https://protected-oasis-12032.herokuapp.com"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
