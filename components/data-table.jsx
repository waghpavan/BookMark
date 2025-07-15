"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download } from "lucide-react"

export default function DataTable({ data = [], onEdit, onDelete, onAdd }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(data)

  const handleSearch = (term) => {
    setSearchTerm(term)
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(term.toLowerCase()) ||
        item.status?.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Data Table</CardTitle>
          <div className="flex space-x-2">
            <Button onClick={onAdd}>Add New</Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
