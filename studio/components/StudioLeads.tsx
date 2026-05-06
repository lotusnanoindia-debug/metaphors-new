import React, { useEffect, useState } from 'react';
import { Card, Text, Stack, Flex, Box, Badge, Label, Spinner } from '@sanity/ui';
import { EnvelopeIcon, UserIcon, CalendarIcon, TagIcon } from '@sanity/icons';

const getSecret = () => {
  try { return process.env.SANITY_STUDIO_LEADS_SECRET; } catch (e) {}
  try { return import.meta.env.SANITY_STUDIO_LEADS_SECRET; } catch (e) {}
  return '';
};

const STUDIO_SECRET = getSecret();

const StudioLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        if (!STUDIO_SECRET) {
          throw new Error('Missing Studio Secret in Environment');
        }

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
            } else {
              throw new Error(data.error || 'Unknown API Error');
            }
          } catch (e) {
            lastError = e;
            continue; // Try next base
          }
        }

        if (!success) throw lastError || new Error('All connection attempts failed');
      } catch (err) {
        setError(err.message || 'Connection error.');
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
    <Box padding={5} style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Stack space={5}>
        <Flex align="center" justify="space-between" borderBottom paddingBottom={4}>
          <Stack space={3}>
            <Text size={4} weight="bold" style={{ letterSpacing: '-0.02em' }}>Client CRM & Enquiries</Text>
            <Text size={2} muted>Direct leads captured from the Metaphors Design ecosystem</Text>
          </Stack>
          <Flex align="center" gap={3}>
            <Badge tone="primary" mode="outline" padding={3} fontSize={2}>
              {leads.length} Total Leads
            </Badge>
          </Flex>
        </Flex>

        {leads.length === 0 ? (
          <Card padding={6} border radius={3} style={{ borderStyle: 'dashed' }}>
            <Flex align="center" justify="center">
              <Text size={2} muted>No enquiries found in the database yet.</Text>
            </Flex>
          </Card>
        ) : (
          <Grid columns={[1, 1, 1, 2]} gap={4}>
            {leads.map((lead) => (
              <Card 
                key={lead.id} 
                padding={4} 
                border 
                radius={3} 
                shadow={1}
                style={{ 
                  transition: 'all 0.2s ease', 
                  cursor: 'default',
                }}
              >
                <Stack space={4}>
                  <Flex align="center" justify="space-between">
                    <Flex align="center" gap={3}>
                      <Card radius={4} padding={2} tone="primary">
                        <UserIcon style={{ fontSize: 24 }} />
                      </Card>
                      <Stack space={2}>
                        <Text weight="bold" size={3} style={{ letterSpacing: '-0.01em' }}>
                          {lead.name}
                        </Text>
                        {lead.organisation && (
                          <Text size={1} muted weight="medium">{lead.organisation}</Text>
                        )}
                      </Stack>
                    </Flex>
                    <Flex align="flex-end" direction="column" gap={2}>
                      <Text size={1} muted>
                        {new Date(lead.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </Text>
                      <Text size={1} muted>
                        {new Date(lead.created_at).toLocaleTimeString('en-GB', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex gap={2} wrap="wrap">
                    <Badge tone="primary" padding={2} fontSize={1}>{lead.sector}</Badge>
                    <Badge tone="caution" padding={2} fontSize={1}>{lead.discipline}</Badge>
                    <Badge tone="default" padding={2} fontSize={1}>{lead.context}</Badge>
                  </Flex>

                  <Card padding={4} tone="transparent" radius={2} border style={{ backgroundColor: 'rgba(128, 128, 128, 0.05)' }}>
                    <Text size={2} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, opacity: 0.9 }}>
                      {lead.message}
                    </Text>
                  </Card>

                  <Flex align="center" justify="space-between" paddingTop={2}>
                    <Stack space={3}>
                      <Flex align="center" gap={2}>
                        <EnvelopeIcon style={{ opacity: 0.6 }} />
                        <Text size={2} weight="medium">{lead.email}</Text>
                      </Flex>
                      {lead.phone && (
                        <Flex align="center" gap={2}>
                          <TagIcon style={{ opacity: 0.6 }} />
                          <Text size={2} weight="medium">{lead.phone}</Text>
                        </Flex>
                      )}
                    </Stack>
                    
                    <a 
                      href={`mailto:${lead.email}?subject=Re: Enquiry regarding ${lead.sector} - Metaphors Design`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card 
                        padding={3} 
                        radius={2} 
                        tone="primary" 
                        shadow={1}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                      >
                        <Text size={2} weight="bold">Reply via Email</Text>
                      </Card>
                    </a>
                  </Flex>
                </Stack>
              </Card>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
};

export default StudioLeads;
