export interface TeamLabelDTO {
  labels: string[]
}

export interface PlayerDTO {
  label: string,
  name: string,
  price: number,
  role: string
}

export interface RoleCountDTO {
  count: number,
  roleName: string
}
