---
id: country
title: API Documentation Template for submodules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API Documentation Template for submodules

This template page is adapted from https://github.com/dr5hn/csc-website/blob/main/docs/api/country.md.

Create one markdown page for each submodule (audio, vision, ...) and document its APIs. Always including the following items.

* The commands needed to run the submodule.
* Exposed external interfaces (topics, services and actions) expected to be called by other submodules.
* Important launch files and its parameters.

## Overview

## Topics

List all the topics here.

| Topic | Description | Node | Message Type |
| ----- | ----------- | ---- | ------------ |
| `/topic1` | Desc1. | node1 | `geometry_msgs/PointStamped` |
| `/topic2` | Desc2. | node2 | `geometry_msgs/PointStamped` |

### Topic1

Specify publish rate (or conditions), and other important information. Provide example usages if possible.

### Topic2

## Services

## Actions

### Example Usage
<Tabs>
  <TabItem value="js" label="Javascript" default>

   ```jsx title="countries-states-cities.js"
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

  </TabItem>

  <TabItem value="c++" label="C++">

```php title="countries-states-cities.php"
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.countrystatecity.in/v1/countries/IN',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => array(
    'X-CSCAPI-KEY: API_KEY'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

  </TabItem>

</Tabs>

### Example Success Response
```json
{
  "id": 101,
  "name": "India",
  "iso3": "IND",
  "iso2": "IN",
  "phonecode": "91",
  "capital": "New Delhi",
  "currency": "INR",
  "native": "भारत",
  "emoji": "🇮🇳",
  "emojiU": "U+1F1EE U+1F1F3"
}
```
