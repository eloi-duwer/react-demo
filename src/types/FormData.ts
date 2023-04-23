export enum Gender {
  Male = 'Male',
  Female = 'Other',
  Other = 'Other'
}

export enum Department {
  Finance = 'Finance',
  Administration = 'Administration',
  Commercial = 'Commercial',
  Manufacturing = 'Manufacturing',
  Advertisement = 'Advertisement',
  ComputerScience = 'ComputerScience',
  Other = 'Other'
}

export enum Profession {
  ExecutiveOfficer = 'ExecutiveOfficer',
  Director = 'Director',
  Engineer = 'Engineer',
  Employee = 'Employee',
  OtherActive = 'OtherActive',
  Liberal = 'Liberal',
  Trader = 'Trader',
  Teacher = 'Teacher',
  Retired = 'Retired',
  Inactive = 'Inactive'
}

export enum Plan {
  Digital = 'digital',
  DigitalPhysical = 'digitalPhysical',
}

export enum PaymentMethod {
  Monthly = 'monthly',
  Annualy = 'annualy'
}

export default interface FormData {
  gender?: Gender
  firstName: string
  lastName: string
  department?: Department
  profession?: Profession
  email: string
  password: string

  society?: string
  address: string
  postalCode?: number
  town: string
  country: string
  phone: string

  plan: Plan
  paymentMethod: PaymentMethod
  paymentDetails: string

  acceptNewsLetter: boolean
  acceptCGV: boolean
}