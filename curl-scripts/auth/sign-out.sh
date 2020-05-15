#!/bin/bash

API="http://localhost:4741"
API2="https://protected-oasis-12032.herokuapp.com"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
