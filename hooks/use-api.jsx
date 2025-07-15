"use client"

import { useState, useEffect } from "react"
import ApiService from "../components/api-service"

export function useApi(endpoint, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ApiService.get(endpoint)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export function useApiMutation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (method, endpoint, data = null) => {
    try {
      setLoading(true)
      setError(null)

      let result
      switch (method) {
        case "POST":
          result = await ApiService.post(endpoint, data)
          break
        case "PUT":
          result = await ApiService.put(endpoint, data)
          break
        case "DELETE":
          result = await ApiService.delete(endpoint)
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
