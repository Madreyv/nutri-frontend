import { LabelSt, SelectGroup, SelectSt } from './SelectGroup.styled'

export type SelectOption = { value: string | number; label: string }

type InputSelectProps = {
  id: string
  label: string
  value: string
  options: SelectOption[]
  placeholder: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function InputSelect({ id, label, value, options, placeholder, disabled = false, onChange }: InputSelectProps) {
  return (
    <SelectGroup>
      <LabelSt htmlFor={id}>{label}</LabelSt>
      <SelectSt id={id} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectSt>
    </SelectGroup>
  )
}
