export type ObjectTakeType<T> = T extends {
  [key: keyof any]: infer U
}
  ? U
  : never

export interface DashboardMenuItem {
  label: string
  path: string
  icon: {
    name: string
    fill?: boolean
    fontControlled?: boolean
    class?: string
  }
  class?: string
}

export type Optional<T> = {
  [P in keyof T]?: T[P]
}

export type DynamicObj = {
  [key: string]: any
}
