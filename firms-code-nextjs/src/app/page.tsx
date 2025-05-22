'use client';

import { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, AppBar, Toolbar, Typography, CircularProgress, Alert, useTheme, Button } from '@mui/material';
import SearchOptions from '@/components/SearchOptions';
import ResultsTable from '@/components/ResultsTable';
import Disclaimer from '@/components/Disclaimer';

interface FirmCode {
  code: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  status: string;
}

export default function Home() {
  const theme = useTheme();
  const [codes, setCodes] = useState<FirmCode[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentMatches, setCurrentMatches] = useState<FirmCode[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const cleanText = (text: string) => {
    return typeof text === 'string' ? text.replace(/\n/g, ' ').trim() : '';
  };

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/250507, Updated Firm Codes.csv');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const csvText = await response.text();
        parse(csvText, {
          skipEmptyLines: true,
          complete: function(results) {
            const rows = results.data;
            const dataStartIndex = rows.findIndex((row: any) => row.join(',').includes('District Port Code,FIRMS Code,FIRMS Name'));
            if (dataStartIndex === -1) throw new Error('Could not find data headers in CSV');

            const parsedCodes = rows.slice(dataStartIndex + 1)
              .filter((row: any) => row.join('').trim())
              .map((columns: any) => ({
                code: cleanText(columns[1]),
                name: cleanText(columns[2]),
                type: cleanText(columns[6]),
                address: cleanText(columns[9]),
                city: cleanText(columns[17]),
                state: cleanText(columns[18]),
                zip: cleanText(columns[19]),
                country: cleanText(columns[20]),
                status: cleanText(columns[3])
              }))
              .filter((item: FirmCode) => item.code && item.name && item.type);

            setCodes(parsedCodes);
            setIsDataLoaded(true);
            setLoading(false);
          },
          error: function(error: any) {
            throw new Error('PapaParse error: ' + error);
          }
        });
      } catch (error: any) {
        setError('Error loading data. Please refresh the page.');
        setLoading(false);
        setIsDataLoaded(false);
      }
    };

    loadCSVData();
  }, []);

  const handleSearch = (matches: FirmCode[]) => {
    setCurrentMatches(matches);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
              <Box sx={{ 
                position: 'absolute', 
                left: { xs: 0, sm: -80 },
                width: { xs: 200, sm: 300 },
                height: 25 
              }}>
                <Image
                  src="/Linstol Logo Wordmark White.png"
                  alt="Linstol Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
              <Typography 
                variant="h5" 
                component="h1" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                Public FIRMS Code Search
              </Typography>
              <Button
                component={Link}
                href="/docs"
                sx={{
                  position: 'absolute',
                  right: 0,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Documentation
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchOptions 
          codes={codes}
          isDataLoaded={isDataLoaded}
          onSearch={handleSearch}
        />

        {loading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <ResultsTable matches={currentMatches} />

        <Disclaimer />
      </Container>
    </Box>
  );
}
