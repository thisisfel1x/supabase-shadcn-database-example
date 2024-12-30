import {DataTable} from "@/components/data-table"

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-7xl">
                <DataTable/>
            </div>
        </main>
    )
}