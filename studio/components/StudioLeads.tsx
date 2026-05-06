import React, { useEffect, useState } from 'react';
import { Card, Text, Stack, Flex, Box, Badge, Label, Spinner } from '@sanity/ui';
import { EnvelopeIcon, UserIcon, CalendarIcon, TagIcon } from '@sanity/icons';

const STUDIO_SECRET = process.env.SANITY_STUDIO_LEADS_SECRET;

const StudioLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const isLocal = window.location.hostname === 'localhost';
        
        // Priority order: Localhost -> Production -> Test Link
        const bases = isLocal 
          ? ['http://localhost:4321'] 
          : ['https://metaphors-design.com', 'https://metaphors-new.tkb.workers.dev'];

        let success = false;
        let lastError = null;

        for (const apiBase of bases) {
          try {
            const response = await fetch(`${apiBase}/api/enquiries`, {
              headers: { 'Authorization': `Bearer ${STUDIO_SECRET}` }
            });
            
            const data = await response.json();
            if (data.success) {
              setLeads(data.results);
              success = true;
              break;
            }
          } catch (e) {
            lastError = e;
            continue; // Try next base
          }
        }

        if (!success) throw lastError || new Error('All connection attempts failed');
      } catch (err) {
        setError('Connection error. Is the website running?');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" height="fill">
        <Stack space={3} align="center">
          <Spinner />
          <Text size={1} muted>Synchronising with D1 Database...</Text>
        </Stack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Card padding={5} tone="critical">
        <Text align="center">{error}</Text>
      </Card>
    );
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Flex align="center" justify="space-between" paddingBottom={4}>
          <Stack space={2}>
            <Text size={4} weight="bold">Studio Enquiries</Text>
            <Text size={1} muted>Direct leads captured from metaphors-design.com</Text>
          </Stack>
          <Badge tone="positive">{leads.length} Enquiries</Badge>
        </Flex>

        {leads.length === 0 ? (
          <Card padding={5} border style={{ borderStyle: 'dashed' }}>
            <Text align="center" muted>No enquiries found in the database yet.</Text>
          </Card>
        ) : (
          <Stack space={3}>
            {leads.map((lead) => (
              <Card key={lead.id} padding={4} border radius={2} shadow={1}>
                <Flex gap={4}>
                  <Box flex={1}>
                    <Stack space={4}>
                      <Flex align="center" justify="space-between">
                        <Flex align="center" gap={2}>
                          <UserIcon style={{ fontSize: 20, opacity: 0.5 }} />
                          <Text weight="bold" size={2}>{lead.name}</Text>
                          {lead.organisation && (
                            <Text size={1} muted>• {lead.organisation}</Text>
                          )}
                        </Flex>
                        <Flex align="center" gap={2}>
                          <CalendarIcon style={{ opacity: 0.5 }} />
                          <Text size={1} muted>
                            {new Date(lead.created_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </Flex>
                      </Flex>

                      <Flex gap={2} wrap="wrap">
                        <Badge tone="primary" fontSize={1}>{lead.sector}</Badge>
                        <Badge tone="caution" fontSize={1}>{lead.discipline}</Badge>
                        <Badge fontSize={1}>{lead.context}</Badge>
                      </Flex>

                      <Card padding={3} tone="transparent" radius={1} border>
                        <Text size={2} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                          {lead.message}
                        </Text>
                      </Card>

                      <Flex align="center" gap={4}>
                        <Flex align="center" gap={2}>
                          <EnvelopeIcon style={{ opacity: 0.5 }} />
                          <Text size={1}>{lead.email}</Text>
                        </Flex>
                        {lead.phone && (
                           <Flex align="center" gap={2}>
                            <TagIcon style={{ opacity: 0.5 }} />
                            <Text size={1}>{lead.phone}</Text>
                          </Flex>
                        )}
                        <Box flex={1} />
                        <Text size={0} muted style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Source: {lead.originating_page}
                        </Text>
                      </Flex>
                    </Stack>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default StudioLeads;
