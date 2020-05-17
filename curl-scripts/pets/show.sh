#!/bin/sh

API="http://localhost:4741"
API2="https://protected-oasis-12032.herokuapp.com"
URL_PATH="/pets"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
