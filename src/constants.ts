export type ICategory = keyof typeof categoryColors

export const categoryColors = {
  work: '#0683D9',
  fun: '#9F5BD9',
  social: '#D94182',
  food: '#E36A00',
  chores: '#BF7000',
  research: '#2CA60A',
  selfCare: '#03A893',
  entertainment: '#C9806B',
  tech: '#465BB3',
  tinkering: '#990199',
  shopping: '#C7AF15',
  away: '#566613',
  sleep: '#D92C2B',
  idling: '#525266',
}

export const colors = {
  black: '#000',
  white: '#fff',
  dark: '#202020',
  light: categoryColors.idling,
  green: categoryColors.research,
  orange: categoryColors.food,
  red: categoryColors.sleep,
}
