# Axios Singular

[Live Demo](https://delete-agency.github.io/axios-singular/)

## Motivation

TODO About parallel request and not guaranteed order of receiving reponses

## Installation

Use the package manager [npm](https://docs.npmjs.com/about-npm/) for installation.

```
$ npm install @deleteagency/axios-singular
```

## Usage

```js
import axios from  'axios';
import AxiosSingular from  '@deleteagency/axios-singular';

const instance = new AxiosSingular(axios);

instance.get("/posts")
    .then((response) => {
        console.log(response)
    },() => {
        if (axios.isCancel(error)) {
            console.log('Request canceled' , error)
        }else{
            console.error('Actual error!' , error)
        }
    })
```

## API

### constructor(axiosInstance[, CancelToken, isCancel])

Returns `AxiosSingular`.

In order to use custom axios instance you have to pass CancelToken and isCancel as additional arguments.
That's because custom instances don't have all base axios properties. Read this comment: https://github.com/axios/axios/issues/1330#issuecomment-362846633

#### axiosInstance

*Required*<br>
Type: `object`

Default or any custom axios instance. See details here: https://github.com/axios/axios#creating-an-instance

#### CancelToken

*Optional*<br>
Type: `object`

CancelToken from the base axios instance

#### isCancel

*Optional*<br>
Type: `Function`

isCancel from the base axios instance

### get(...) (request, delete, head, options, post, put, patch)

Returns `Promise`.

Corresponding axios methos is called under the hood with all arguments bypassed. Supported methods: request, get, delete, head, options, post, put, patch
See https://github.com/axios/axios#request-method-aliases

### cancel([reason])

Cancel current request if it is in progress

## License
[MIT](https://choosealicense.com/licenses/mit/)