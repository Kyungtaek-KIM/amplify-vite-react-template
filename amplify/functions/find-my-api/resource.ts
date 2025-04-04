import { defineFunction } from '@aws-amplify/backend'

export const findMyApi = defineFunction({
    name: 'find-my-api',
    entry: './handler.ts',
})