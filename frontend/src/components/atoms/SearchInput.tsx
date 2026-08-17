import { Search } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label: string
}

export function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
