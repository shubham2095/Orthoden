import { z } from 'zod'

const PHONE_RE = /^[+\d][\d\s\-()]{5,19}$/

// "Required" message only when the field is missing; wrong types and other rules keep their own messages.
const required = (message) => (issue) => (issue.input === undefined ? message : 'Invalid input.')

const optionalText = (max) => z.string().trim().max(max, `Text must be ${max} characters or fewer.`).default('')

export const contactSchema = z.object({
  name: z
    .string({ error: required('Name is required.') })
    .trim()
    .min(1, 'Name is required.')
    .max(100, 'Name must be 100 characters or fewer.'),
  phone: z
    .string({ error: required('Phone number is required.') })
    .trim()
    .min(1, 'Phone number is required.')
    .regex(PHONE_RE, 'Please enter a valid phone number.'),
  email: z
    .string()
    .trim()
    .max(254, 'Email is too long.')
    .default('')
    .refine((value) => value === '' || z.email().safeParse(value).success, 'Please enter a valid email address.'),
  service: optionalText(100),
  message: z
    .string({ error: required('Message is required.') })
    .trim()
    .min(1, 'Message is required.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
})
