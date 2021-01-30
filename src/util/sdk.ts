import SDK from '../../ac-api-sdk/src'
import endpoints from '@/strings/static/endpoints'
const api = SDK({
    gql_api_url: endpoints.api_url
})

export const {
    auth,
    blog,
    other
} = api
