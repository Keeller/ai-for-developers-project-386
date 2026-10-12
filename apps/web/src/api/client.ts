import type { paths } from '@calendar/api-contract'
import createClient from 'openapi-fetch'

export const apiClient = createClient<paths>({ baseUrl: '/' })
