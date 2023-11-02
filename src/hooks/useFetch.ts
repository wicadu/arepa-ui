import { useMemo, useRef, useState, useEffect } from 'react'
import qs from 'qs'
import isObjectEmpty from '../utils/isObjectEmpty'

type Options = {
  fetchOptions?: RequestInit
  params?: object
  body?: object
  onCompleted?: (data: Response['data']) => void
  onError?: (error: Response['error']) => void
  skip?: boolean
}

const defaultOptions: Options = {
  fetchOptions: {},
  onCompleted () {},
  onError () {}
}

export type Response = {
  status: null | number
  error: null | Error
  data: null | object
  loading: boolean
}

export default function useFetch(
  url: string,
  options: Options = {}
): Response {
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

  useEffect(() => {
    setLoading(!skip)
    setError(null)

    if (!skip) {
      let endpoint: string = url
      let options: any = fetchOptions

      if (!isObjectEmpty(params)) endpoint += qs.stringify(params, { addQueryPrefix: true })
      if (!isObjectEmpty(body)) options.body = JSON.stringify(body)

      fetch(endpoint, { ...fetchOptions, signal })
        .then(async res => {
          setStatus(res.status)

          if (res.status !== 200) {
            const data = await res.json()
            throw new Error(data?.message)
          }

          return res.json()
        })
        .then(data => {
          setData(data)
          setLoading(false)
          onCompleted(data)
        })
        .catch(error => {
          setError(error)
          setLoading(false)
          onError(error)
        })
    }
  }, [skip])

  useEffect(() => {
    abortController.current = new AbortController()

    return () => {
      abortController.current?.abort()
    }
  }, [])

  return { status, error, data, loading }
}
