import { Card, Stack } from '@components'
import { colors } from '@constants'
import styled from '@emotion/styled'
import React from 'react'

const Section = styled(Card)<{ first?: boolean; last?: boolean }>`
  border-radius: ${({ first, last }) => (first ? '8px 0 0 8px' : last ? '0 8px 8px 0' : '0')};
`

interface Common<ValueType = string> {
  onClick?(item: Item<ValueType>): void
  secondClick?(item: Item<ValueType>): void
  active?: (item: Item<ValueType>) => boolean
  // background?(item: Item<ValueType>): string
}

type Item<ValueType = string> = {
  value: ValueType
} & Common<ValueType>

type Props<ValueType = string> = {
  items: Item<ValueType>[]
} & Common<ValueType>

export const Sections = <ValueType extends string | number = string>({
  items,
  onClick,
  secondClick,
  active,
}: Props<ValueType>): React.ReactElement => {
  return (
    <Stack gap={4}>
      {items.map((item, i) => {
        const itemActive = (item.active || active)?.(item)
        return (
          <Section
            key={i}
            onClick={() =>
              itemActive
                ? (item.secondClick || secondClick)?.(item)
                : (item.onClick || onClick)?.(item)
            }
            style={{
              backgroundColor: itemActive ? colors.light : colors.gray,
            }}
            first={i === 0}
            last={i === items.length - 1}
          >
            {item.value}
          </Section>
        )
      })}
    </Stack>
  )
}
