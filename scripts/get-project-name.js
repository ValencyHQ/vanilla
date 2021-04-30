// eslint-disable-next-line @typescript-eslint/no-var-requires
const easyjson = require('easyjson')

// eslint-disable-next-line no-console
console.log(easyjson.path('package').get('name'));
