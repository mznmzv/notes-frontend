import { User, UserData } from '../../types'
import { api } from './api'

const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<User & { token: string }, UserData>({
      query: userData => ({
        url: '/user/login',
        body: userData,
        method: 'POST',
      }),
    }),
    register: build.mutation<User, UserData>({
      query: userData => ({
        url: '/user/register',
        body: userData,
        method: 'POST',
      }),
    }),
    current: build.query<User, void>({
      query: () => ({
        url: '/user',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { current, login, register } = userApi.endpoints
export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  userApi
