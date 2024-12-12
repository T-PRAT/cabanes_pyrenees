import { FormItem, FormLabel, FormControl, FormMessage, FormField } from './form'
import { Input } from './input'

interface FormFieldItemProps {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control: any
   name: string
   label: string
   placeholder?: string
   type?: string
}

const FormFieldItem: React.FC<FormFieldItemProps> = ({ control, name, label, placeholder = '', type = 'text' }) => (
   <FormField
      control={control}
      name={name}
      render={({ field }) => (
         <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
               <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage />
         </FormItem>
      )}
   />
)

export default FormFieldItem
