export type ICategory = keyof typeof categoryColors

export const categoryColors = {
  work: '#0683D9',
  fun: '#9F5BD9',
  social: '#D94182',
  food: '#E36A00',
  chores: '#BF7000',
  research: '#2CA60A',
  body: '#0ba1a1',
  entertainment: '#C9806B',
  tech: '#465BB3',
  tinkering: '#990199',
  mind: '#C7AF15',
  away: '#566613',
  sleep: '#D92C2B',
  idling: '#414148',
  tasks: '#991101',
  exploring: '#1c966a',
}

export const colors = {
  black: '#000',
  white: '#fff',
  dark: '#1a1a1a',
  light: categoryColors.idling,
  green: categoryColors.research,
  yellow: categoryColors.mind,
  orange: categoryColors.food,
  red: categoryColors.sleep,
}
