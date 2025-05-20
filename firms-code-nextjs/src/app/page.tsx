'use client';

import { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import Image from 'next/image';
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
    <main className="min-h-screen">
      <nav className="bg-[#AC162C] w-full py-4">
        <div className="container mx-auto px-0 relative">
          <div className="flex items-center justify-center">
            <div className="absolute -left-20 w-[300px] h-[25px]">
              <Image
                src="/Linstol Logo Wordmark White.png"
                alt="Linstol Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <h1 className="text-white text-2xl font-bold">Public FIRMS Code Search</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <SearchOptions 
          codes={codes}
          isDataLoaded={isDataLoaded}
          onSearch={handleSearch}
        />

        {loading && <div className="text-blue-500 mt-3">Loading data...</div>}
        {error && <div className="text-red-500 mt-3">{error}</div>}

        <ResultsTable matches={currentMatches} />

        <Disclaimer />
      </div>
    </main>
  );
}
