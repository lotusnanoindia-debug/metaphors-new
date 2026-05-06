import React, { useEffect, useState } from 'react'
import { useClient, useFormValue } from 'sanity'
import { Card, Text, Stack, Box, Badge, Flex } from '@sanity/ui'

export function ClientProjects() {
  const documentId = useFormValue(['_id']) as string
  const sanityClient = useClient({ apiVersion: '2024-03-01' })
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!documentId) {
      setLoading(false)
      return
    }
    
    // If the document is a draft, we need to check against the published ID for references
    const baseId = documentId.replace('drafts.', '')
    
    const query = `*[_type == "project" && client._ref == $clientId]{ _id, "title": projectName, "sector": category->title, projectStatus }`
    sanityClient.fetch(query, { clientId: baseId })
      .then(res => {
        setProjects(res)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [documentId, sanityClient])

  if (!documentId && !loading) {
    return <Text size={1} muted>Save this client to see associated projects.</Text>
  }

  if (loading) {
    return <Text size={1} muted>Loading associated projects...</Text>
  }

  if (projects.length === 0) {
    return (
      <Card padding={3} radius={2} tone="transparent" border>
        <Text size={1} muted>No projects currently reference this client.</Text>
      </Card>
    )
  }

  return (
    <Card padding={3} radius={2} tone="default" border>
      <Stack space={3}>
        <Text size={1} weight="semibold">Associated Projects ({projects.length})</Text>
        <Stack space={2}>
          {projects.map((p, i) => (
            <Card key={i} padding={2} radius={1} shadow={1}>
              <Flex align="center" justify="space-between">
                <Text size={1} weight="medium">{p.title || 'Untitled Project'}</Text>
                <Flex gap={2}>
                  {p.sector && <Badge mode="outline">{p.sector}</Badge>}
                  {p.projectStatus && <Badge tone="primary">{p.projectStatus}</Badge>}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
