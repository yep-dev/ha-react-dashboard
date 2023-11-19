import { createContext } from 'react'

export type GlobalData = {
  marvin: {
    nameId: Record<string, string>
    idName: Record<string, string>
    idParent: Record<string, string>
  }
  toggl: {
    nameId: Record<string, number>
    idName: Record<string, string>
  }
  categories: {
    projectCategory: Record<string, Category>
    categoryProject: Record<Category, string>
  }
}

// @ts-expect-error
export const GlobalContext = createContext<GlobalData>()

export type Category =
  | 'Research'
  | 'Body'
  | 'Social'
  | 'Away'
  | 'Chores'
  | 'Tasks'
  | 'Entertainment'
  | 'Food'
  | 'Tinkering'
  | 'Fun'
  | 'Tech'
  | 'Idling'
  | 'Mind'
  | 'Sleep'
  | 'Work'
