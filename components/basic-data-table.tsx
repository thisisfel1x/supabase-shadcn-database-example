"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {flexRender, Table as ReactTable} from "@tanstack/react-table"
import {Skeleton} from "@/components/ui/skeleton"
import {DataTablePagination} from "@/components/data-table-pagination"

interface ReusableTableProps<TData> {
    table: ReactTable<TData>
    isLoading: boolean
    showPagination: boolean
}

export function BasicDataTable<TData>({table, isLoading, showPagination}: ReusableTableProps<TData>) {
    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({length: table.getState().pagination.pageSize}).map((_, index) => (
                                <TableRow key={index}>
                                    {table.getAllColumns().map((column, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <Skeleton className="h-6 w-full"/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    Keine Ergebnisse
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {showPagination && <DataTablePagination table={table}/>}
            </div>
        </div>
    )
}