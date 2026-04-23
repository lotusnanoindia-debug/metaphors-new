import React, {useEffect, useState, useCallback} from 'react'
import {Stack, Checkbox, Text, Flex, Spinner} from '@sanity/ui'
import {set, unset, useClient} from 'sanity'

export function DisciplineCheckboxes(props) {
  const {onChange, value = []} = props
  const client = useClient({apiVersion: '2024-03-01'})
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch the available disciplines
  useEffect(() => {
    client
      .fetch(`*[_type == "discipline"] | order(order asc) {_id, title}`)
      .then((res) => {
        setOptions(res)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch disciplines:', err)
        setLoading(false)
      })
  }, [client])

  const handleToggle = useCallback(
    (optionId) => {
      const isSelected = value.some((item) => item._ref === optionId)
      let nextValue

      if (isSelected) {
        // Remove the item
        nextValue = value.filter((item) => item._ref !== optionId)
      } else {
        // Add the item
        nextValue = [
          ...value,
          {
            _type: 'reference',
            _ref: optionId,
            _key: Math.random().toString(36).substring(2, 9), // Sanity requires unique keys in arrays
          },
        ]
      }

      // If array is empty, unset the field, otherwise set the new array
      onChange(nextValue.length > 0 ? set(nextValue) : unset())
    },
    [onChange, value],
  )

  if (loading) {
    return <Spinner muted />
  }

  return (
    <Stack space={3}>
      {options.map((option) => {
        const isChecked = value.some((item) => item._ref === option._id)
        return (
          <Flex align="center" gap={3} key={option._id}>
            <Checkbox
              checked={isChecked}
              onChange={() => handleToggle(option._id)}
              id={`checkbox-${option._id}`}
            />
            <Text as="label" htmlFor={`checkbox-${option._id}`} size={1} weight="medium">
              {option.title}
            </Text>
          </Flex>
        )
      })}
    </Stack>
  )
}
