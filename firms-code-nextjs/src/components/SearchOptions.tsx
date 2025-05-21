'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';

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

interface SearchOptionsProps {
  codes: FirmCode[];
  isDataLoaded: boolean;
  onSearch: (matches: FirmCode[]) => void;
}

export default function SearchOptions({ codes, isDataLoaded, onSearch }: SearchOptionsProps) {
  const theme = useTheme();
  const [searchMode, setSearchMode] = useState<'general' | 'specific'>('general');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    general: '',
    firmCode: '',
    firmName: '',
    facilityType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    status: ''
  });

  const createRegex = (term: string, caseSensitive: boolean) => {
    if (!term) return null;
    return new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), caseSensitive ? '' : 'i');
  };

  const handleSearch = () => {
    if (!isDataLoaded) {
      return;
    }

    let matches: FirmCode[] = [];

    if (searchMode === 'general') {
      const searchTerm = searchTerms.general.trim();
      if (!searchTerm) return;

      const regex = createRegex(searchTerm, caseSensitive);
      matches = codes.filter(item =>
        Object.values(item).some(value => regex?.test(value))
      );
    } else {
      const fields = {
        code: searchTerms.firmCode,
        name: searchTerms.firmName,
        type: searchTerms.facilityType,
        address: searchTerms.address,
        city: searchTerms.city,
        state: searchTerms.state,
        zip: searchTerms.zip,
        country: searchTerms.country,
        status: searchTerms.status
      };

      const hasSearchTerm = Object.values(fields).some(term => term.trim());

      if (!hasSearchTerm) return;

      const regexes = Object.entries(fields).reduce((acc, [key, term]) => {
        acc[key] = term.trim() ? createRegex(term, caseSensitive) : null;
        return acc;
      }, {} as Record<string, RegExp | null>);

      matches = codes.filter(item =>
        Object.entries(regexes).every(([key, regex]) =>
          !regex || regex.test(item[key as keyof FirmCode])
        )
      );
    }

    onSearch(matches);
  };

  const handleClear = () => {
    setSearchTerms({
      general: '',
      firmCode: '',
      firmName: '',
      facilityType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      status: ''
    });
    onSearch([]);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 2.5 }, mt: 4, bgcolor: 'background.paper', width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel>Search Mode</InputLabel>
            <Select
              value={searchMode}
              label="Search Mode"
              onChange={(e) => setSearchMode(e.target.value as 'general' | 'specific')}
            >
              <MenuItem value="general">General Search (All Fields)</MenuItem>
              <MenuItem value="specific">Search By Specific Fields</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
            }
            label="Case Sensitive"
          />
        </Grid>
      </Grid>

      {searchMode === 'general' ? (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              placeholder="Enter search term (searches across all fields)"
              value={searchTerms.general}
              onChange={(e) => handleInputChange('general', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="FIRMS Code"
              placeholder="C556"
              value={searchTerms.firmCode}
              onChange={(e) => handleInputChange('firmCode', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="FIRMS Name"
              placeholder="Michael Lewis"
              value={searchTerms.firmName}
              onChange={(e) => handleInputChange('firmName', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Facility Type</InputLabel>
              <Select
                value={searchTerms.facilityType}
                label="Facility Type"
                onChange={(e) => handleInputChange('facilityType', e.target.value)}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Bonded Warehouse">Bonded Warehouse</MenuItem>
                <MenuItem value="Bridge">Bridge</MenuItem>
                <MenuItem value="CES">CES</MenuItem>
                <MenuItem value="Customs Administrative Site">Customs Administrative Site</MenuItem>
                <MenuItem value="Customs Container Station">Customs Container Station</MenuItem>
                <MenuItem value="Data Processing Site">Data Processing Site</MenuItem>
                <MenuItem value="Foreign Trade Zone">Foreign Trade Zone</MenuItem>
                <MenuItem value="Importer Premises">Importer Premises</MenuItem>
                <MenuItem value="Inspection Facility">Inspection Facility</MenuItem>
                <MenuItem value="Multi-Use-Bonded">Multi-Use-Bonded</MenuItem>
                <MenuItem value="Pier">Pier</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Street Address"
              value={searchTerms.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City"
              value={searchTerms.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="State"
              placeholder="CA"
              value={searchTerms.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Zip"
              value={searchTerms.zip}
              onChange={(e) => handleInputChange('zip', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Country"
              value={searchTerms.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Status"
              value={searchTerms.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
        </Grid>
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
    </Paper>
  );
} 