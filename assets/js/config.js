const NODE_ENV = 'dev'
const DEFAULT_IMAGE_URL = 'http://ap.cd31953.tmweb.ru/sites/default/files/placeholder_image.jpg'

let BACKEND_URL = 'http://localhost:3000/'
if (NODE_ENV === 'dev') {
    BACKEND_URL = ''
}
