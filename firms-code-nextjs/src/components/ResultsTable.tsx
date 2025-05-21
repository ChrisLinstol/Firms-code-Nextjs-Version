'use client';

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

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

interface ResultsTableProps {
  matches: FirmCode[];
}

export default function ResultsTable({ matches }: ResultsTableProps) {
  const exportToCSV = () => {
    if (matches.length === 0) return;

    const headers = ['FIRMS Code', 'FIRMS Name', 'Facility Type', 'Street Address', 
                    'City', 'State', 'Zip', 'Country', 'FIRMS Status'];
    const csvRows = [
      headers.join(','),
      ...matches.map(item => 
        [item.code, item.name, item.type, item.address, item.city, 
         item.state, item.zip, item.country, item.status]
        .map(field => `"${field || ''}"`).join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `firms_search_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {matches.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography color="text.secondary">
            Found {matches.length} match{matches.length === 1 ? '' : 'es'}.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={exportToCSV}
          >
            Export to CSV
          </Button>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>FIRMS Code</TableCell>
              <TableCell>FIRMS Name</TableCell>
              <TableCell>Facility Type</TableCell>
              <TableCell>Street Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>FIRMS Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((item, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.zip}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 