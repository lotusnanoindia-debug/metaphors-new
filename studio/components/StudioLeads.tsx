import React, { useEffect, useState } from 'react';
import { EnvelopeIcon, UserIcon, CalendarIcon, TagIcon, SearchIcon } from '@sanity/icons';
import { TextInput, Button, Grid, Box, Flex, Stack, Text, Card, Badge, Spinner } from '@sanity/ui';
import styled from 'styled-components';

const getSecret = () => {
  try { return process.env.SANITY_STUDIO_LEADS_SECRET; } catch (e) {}
  try { return import.meta.env.SANITY_STUDIO_LEADS_SECRET; } catch (e) {}
  return '';
};

const STUDIO_SECRET = getSecret();

// PREMIUM ARCHITECTURAL STYLING
const DashboardContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  background: transparent;
  color: #fff;
`;

const LeadCard = styled.div`
  background: #111;
  border-left: 1px solid #333;
  padding: 30px;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    border-left-color: #fff;
    background: #161616;
  }
`;

const GroupHeader = styled.div`
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #666;
  padding: 20px 0;
  border-bottom: 1px solid #222;
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const StudioLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        if (!STUDIO_SECRET) throw new Error('Missing Studio Secret');
        const isLocal = window.location.hostname === 'localhost';
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
              throw new Error(data.error);
            }
          } catch (e) {
            lastError = e;
            continue;
          }
        }
        if (!success) throw lastError;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // SEARCH LOGIC
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.organisation && l.organisation.toLowerCase().includes(searchTerm.toLowerCase())) ||
    l.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // GROUPING LOGIC
  const groupedLeads = filteredLeads.reduce((acc, lead) => {
    const date = new Date(lead.created_at);
    const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(lead);
    return acc;
  }, {});

  if (loading) return (
    <Flex align="center" justify="center" height="fill"><Spinner /></Flex>
  );

  return (
    <DashboardContainer>
      <Stack space={6}>
        <Flex align="center" justify="space-between">
          <Stack space={3}>
            <Text size={4} weight="bold" style={{ color: '#fff' }}>Metaphors CRM</Text>
            <Text size={1} style={{ color: '#666' }}>Intelligence-led business capture</Text>
          </Stack>
          
          <Box style={{ width: '400px' }}>
            <TextInput
              icon={SearchIcon}
              placeholder="Search enquiries by name, company, or content..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              fontSize={1}
              padding={4}
            />
          </Box>
        </Flex>

        {Object.keys(groupedLeads).length === 0 ? (
          <Box paddingY={6} style={{ textAlign: 'center' }}>
            <Text size={2} muted>No matching enquiries found.</Text>
          </Box>
        ) : (
          Object.keys(groupedLeads).map((month) => (
            <div key={month}>
              <GroupHeader>
                <span>{month}</span>
                <span>{groupedLeads[month].length} Leads</span>
              </GroupHeader>
              
              <Grid columns={[1, 1, 2]} gap={4}>
                {groupedLeads[month].map((lead) => (
                  <LeadCard key={lead.id}>
                    <Stack space={5}>
                      <Flex justify="space-between" align="flex-start">
                        <Stack space={2}>
                          <Text weight="bold" size={3} style={{ color: '#fff' }}>{lead.name}</Text>
                          {lead.organisation && <Text size={1} style={{ color: '#aaa' }}>{lead.organisation}</Text>}
                        </Stack>
                        <Text size={0} style={{ color: '#444' }}>
                          {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </Flex>

                      <div style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.7', borderLeft: '1px solid #222', paddingLeft: '15px' }}>
                        {lead.message}
                      </div>

                      <Flex gap={2} wrap="wrap">
                        <Badge fontSize={0} style={{ background: '#222', color: '#fff', border: 'none' }}>{lead.sector}</Badge>
                        <Badge fontSize={0} style={{ background: '#222', color: '#fff', border: 'none' }}>{lead.discipline}</Badge>
                      </Flex>

                      <Flex align="center" justify="space-between">
                        <Stack space={2}>
                          <Text size={1} style={{ color: '#888' }}>{lead.email}</Text>
                          {lead.phone && <Text size={1} style={{ color: '#888' }}>{lead.phone}</Text>}
                        </Stack>
                        
                        <a 
                          href={`mailto:${lead.email}?subject=Metaphors Design: Re: ${lead.sector}`}
                          style={{ 
                            textDecoration: 'none', 
                            background: '#fff', 
                            color: '#000', 
                            padding: '10px 20px', 
                            fontSize: '11px', 
                            fontWeight: 'bold', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                          }}
                        >
                          Respond
                        </a>
                      </Flex>
                    </Stack>
                  </LeadCard>
                ))}
              </Grid>
            </div>
          ))
        )}
      </Stack>
    </DashboardContainer>
  );
};

export default StudioLeads;
