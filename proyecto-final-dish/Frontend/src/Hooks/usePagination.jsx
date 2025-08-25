import { useState, useMemo, useEffect } from 'react'

export const usePagination = (items, itemsPerPage = 15) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items, itemsPerPage]
  )

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, currentPage, itemsPerPage])

  const goToPage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  return { currentItems, currentPage, totalPages, goToPage }
}
