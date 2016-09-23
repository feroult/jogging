#!/bin/bash
curl -v -H "Content-type: application/json" -H "Authorization: Bearer $TOKEN" $* | json_pp
