import {ColumnDef} from "@tanstack/react-table"
import {DatabaseSchema} from "@/types"

export const columns: ColumnDef<DatabaseSchema>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({row}) => {
            const date = new Date(row.getValue("date"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },
]