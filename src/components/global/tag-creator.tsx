'use client'
import { Tag } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  subAccountId: string,
  getSelectedTags: (tags: Tag[]) => void,
  defaultTags?: Tag[]
}
const TagColors = ['BLUE', 'ORANGE', 'ROSE', 'PURPLE', 'GREEN']
export type TagColor = (typeof TagColors) [number]

const TagCreator = ({ getSelectedTags, subAccountId, defaultTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || [])
  const [tags, setTags] = useState<Tag[]>([])
  const router = useRouter()
  const [value, setValue] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  useEffect(() => {
    getSelectedTags(selectedTags)
  }, [selectedTags])

  

  return (
    <div>TagCreator</div>
  )
}

export default TagCreator