import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import qs from 'qs'
import isObjectEmpty from '../utils/isObjectEmpty'


type Options = {
  fetchOptions?: RequestInit
  params?: object
  body?: object
  formData?: FormData
  onCompleted?: (data: Response['data']) => void
  onError?: (error: Response['error']) => void
  skip?: boolean
}

type InputOptions = {
  fetchOptions?: RequestInit
  params?: object
  body?: object
  formData?: FormData
}

type Action = (opts: Options) => Promise<Response>

const defaultOptions: Options = {
  fetchOptions: {},
  onCompleted () {},
  onError () {}
}

export type Response = {
  status: null | number
  error: null | Error
  data: null | object | any // TODO: Replace this any by TResponse
  loading: boolean
}

export default function useLazyFetch<TResponse>(
  url: string,
  options: Options = {}
): [Action, Response] {
  const {
    fetchOptions,
    params,
    body,
    onCompleted,
    onError,
    skip
  }: any = {
    ...defaultOptions,
    ...options
  }

  const [status, setStatus] = useState<Response['status']>(null)
  const [data, setData] = useState<Response['data']>(null)
  const [error, setError] = useState<Response['error']>(null)
  const [loading, setLoading] = useState<Response['loading']>(false)
  const abortController = useRef<null | AbortController>(null)

  const signal = useMemo(() => abortController.current?.signal, [abortController])

  const getData = useCallback(async (inputOptions: InputOptions = {}): Promise<Response> => {
    if (skip) return {
      data,
      status,
      error,
      loading
    }

    setLoading(true)
    setError(null)

    let endpoint: string = url
    let options: any = fetchOptions

    if (!isObjectEmpty(params)) endpoint += qs.stringify(params, { addQueryPrefix: true })
    if (!isObjectEmpty(inputOptions.params)) endpoint += qs.stringify(inputOptions.params, { addQueryPrefix: true })
    if (!isObjectEmpty(body)) options.body = JSON.stringify(body)
    if (!isObjectEmpty(inputOptions.body)) options.body = JSON.stringify(inputOptions.body)
    if (Boolean(inputOptions.formData)) options.body = inputOptions.formData

    return fetch(endpoint, { ...options, signal })
      .then(async res => {
        setStatus(res.status)

        if (res.status < 200 || res.status > 299) {
          const data = await res.json()
          throw new Error(data?.message)
        }

        return res.json()
      })
      .then(data => {
        setData(data)

        const loading: boolean = false
        setLoading(loading)
        onCompleted(data)

        return { data, status, error: null, loading }
      })
      .catch((error) => {
        setError(error)
        const loading: boolean = false
        setLoading(loading)
        onError(error)

        return { data: null, status, error, loading }
      })
    }, [
      setLoading,
      signal,
      setData,
      setError,
      setStatus,
      url,
      params,
      body
    ])

  useEffect(() => {
    abortController.current = new AbortController()

    return () => {
      abortController.current?.abort()
    }
  }, [])

  return [
    getData, {
      status,
      error,
      data,
      loading
    }
  ]
}
