import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Calendar} from "@/components/ui/calendar"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {
    ArrowLeft,
    ArrowRight,
    Building,
    CalendarIcon,
    ChevronDown, ChevronLeft,
    ChevronRight,
    Equal,
    Filter,
    Space,
    User,
    X
} from 'lucide-react'
import {format} from "date-fns"

export type FilterType = {
    id: string
    field: string
    operator: string
    value: string
}

const filterFields = [
    {value: "name", label: "Name", icon: User},
    {value: "company", label: "Company", icon: Building},
    {value: "age", label: "Age", icon: User},
    {value: "date", label: "Date", icon: CalendarIcon},
]

const operatorOptions = {
    default: [
        {value: "equals", label: "Equals", icon: Equal},
        {value: "contains", label: "Contains", icon: Space},
        {value: "startsWith", label: "Starts with", icon: ArrowRight},
        {value: "endsWith", label: "Ends with", icon: ArrowLeft},
    ],
    date: [
        {value: "equals", label: "Equals", icon: Equal},
        {value: "before", label: "Before", icon: ArrowLeft},
        {value: "after", label: "After", icon: ArrowRight},
    ],
    numeric: [
        {value: "equals", label: "Equals", icon: Equal},
        {value: "greaterThan", label: "Greater than", icon: ChevronRight},
        {value: "lessThan", label: "Less than", icon: ChevronLeft},
    ],
}

interface DataTableSearchProps {
    onFiltersChange: (filters: FilterType[]) => void
}

export default function DataTableSearch({onFiltersChange}: DataTableSearchProps) {
    const [filters, setFilters] = useState<FilterType[]>([])
    const [open, setOpen] = useState(false)
    const [currentFilter, setCurrentFilter] = useState<Omit<FilterType, 'id'>>({
        field: "name",
        operator: "equals",
        value: "",
    })
    const [date, setDate] = useState<Date>()

    const handleAddFilter = () => {
        if (currentFilter.value.trim() !== "") {
            const newFilter = {...currentFilter, id: `${currentFilter.field}-${Date.now()}`}
            const updatedFilters = [...filters, newFilter]
            setFilters(updatedFilters)
            onFiltersChange(updatedFilters)
            setCurrentFilter({field: "name", operator: "equals", value: ""})
            setDate(undefined)
            setOpen(false)
        }
    }

    const handleRemoveFilter = (id: string) => {
        const updatedFilters = filters.filter(filter => filter.id !== id)
        setFilters(updatedFilters)
        onFiltersChange(updatedFilters)
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="border-dashed">
                        <Filter className="mr-2 h-4 w-4"/>
                        Add filter
                        <ChevronDown className="ml-2 h-4 w-4"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Filter</h4>
                            <p className="text-sm text-muted-foreground">
                                Add one or more filters to refine search results
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Select
                                value={currentFilter.field}
                                onValueChange={(value) => setCurrentFilter({...currentFilter, field: value})}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select field"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {filterFields.map((field) => (
                                        <SelectItem key={field.value} value={field.value}>
                                            <div className="flex items-center">
                                                <field.icon className="mr-2 h-4 w-4"/>
                                                {field.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                                <TooltipProvider>
                                    {(currentFilter.field === "date"
                                            ? operatorOptions.date
                                            : currentFilter.field === "age"
                                                ? operatorOptions.numeric
                                                : operatorOptions.default
                                    ).map((op) => (
                                        <Tooltip key={op.value}>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={currentFilter.operator === op.value ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentFilter({
                                                        ...currentFilter,
                                                        operator: op.value
                                                    })}
                                                >
                                                    <op.icon className="h-4 w-4"/>
                                                    <span className="sr-only">{op.label}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{op.label}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </div>
                            {currentFilter.field === "date" ? (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(newDate) => {
                                                setDate(newDate)
                                                setCurrentFilter({
                                                    ...currentFilter,
                                                    value: newDate ? format(newDate, "yyyy-MM-dd") : ""
                                                })
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            ) : currentFilter.field === "age" ? (
                                <Input
                                    type="number"
                                    placeholder="Enter age"
                                    value={currentFilter.value}
                                    onChange={(e) => setCurrentFilter({...currentFilter, value: e.target.value})}
                                    className="h-8"
                                />
                            ) : (
                                <Input
                                    placeholder="Add value"
                                    value={currentFilter.value}
                                    onChange={(e) => setCurrentFilter({...currentFilter, value: e.target.value})}
                                    className="h-8"
                                />
                            )}
                        </div>
                        <Button size="sm" onClick={handleAddFilter} disabled={currentFilter.value.trim() === ""}>
                            Add filter
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            {filters.map((filter) => (
                <Badge key={filter.id} variant="secondary" className="text-sm">
                    {filterFields.find(f => f.value === filter.field)?.label}
                    {' '}
                    {operatorOptions.default.concat(operatorOptions.date).concat(operatorOptions.numeric).find(op => op.value === filter.operator)?.label}
                    {' '}
                    {filter.value}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFilter(filter.id)}
                        className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                    >
                        <X className="h-3 w-3"/>
                        <span className="sr-only">Remove filter</span>
                    </Button>
                </Badge>
            ))}
        </div>
    )
}