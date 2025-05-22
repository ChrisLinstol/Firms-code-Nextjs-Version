import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

export default function DocumentationPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Simple Guide: Public FIRMS Code Search
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What Is It?
        </Typography>
        <Typography paragraph>
          The <strong>Public FIRMS Code Search</strong> is an easy-to-use website that helps you look up information about facilities (like warehouses and ports) using special codes called FIRMS codes.
        </Typography>
        <Typography paragraph>
          You can search for locations by name, city, or code, and download your results if needed.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Getting Started
        </Typography>
        <Typography paragraph><strong>Step 1: Open the Website</strong></Typography>
        <List>
          <ListItem><ListItemText primary="It will load the full list of FIRMS codes automatically." /></ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          How to Search
        </Typography>

        <Typography variant="subtitle1"><strong>1. Quick Search (Search All Fields)</strong></Typography>
        <List dense>
          <ListItem><ListItemText primary='Make sure "General Search (All Fields)" is selected at the top.' /></ListItem>
          <ListItem><ListItemText primary='Type what you’re looking for (e.g., "New York" or "LAX").' /></ListItem>
          <ListItem><ListItemText primary='(Optional) Tick the "Case Sensitive" box if you want to match upper/lowercase exactly.' /></ListItem>
          <ListItem><ListItemText primary='Click Search.' /></ListItem>
          <ListItem><ListItemText primary='Your results will appear below.' /></ListItem>
        </List>
        <Typography variant="body2">
          Example: Typing <strong>LAX</strong> will find anything that includes “LAX” — like a city, name, or facility type (even "Relax" would show up).
        </Typography>

        <Box mt={3}>
          <Typography variant="subtitle1"><strong>2. Detailed Search (By Specific Fields)</strong></Typography>
          <List dense>
            <ListItem><ListItemText primary='Choose "Search By Specific Fields" from the dropdown.' /></ListItem>
            <ListItem><ListItemText primary='Fill in one or more boxes (e.g., type "CA" in the State field).' /></ListItem>
            <ListItem><ListItemText primary='Click Search.' /></ListItem>
            <ListItem><ListItemText primary='Results will appear below.' /></ListItem>
          </List>
          <Typography variant="body2">
            You don’t need to fill every field — just the ones that help you find what you’re looking for.
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Buttons and What They Do
        </Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell><strong>Search</strong></TableCell>
              <TableCell>Starts the search.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Clear</strong></TableCell>
              <TableCell>Empties all boxes and removes the search results.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Export to CSV</strong></TableCell>
              <TableCell>Downloads the results to your computer as a spreadsheet file.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Case Sensitive</strong></TableCell>
              <TableCell>Only shows results with exact capital/lowercase match (optional).</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Understanding Your Results
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="FIRMS Code – Unique code for the facility" /></ListItem>
          <ListItem><ListItemText primary="FIRMS Name – Name of the facility" /></ListItem>
          <ListItem><ListItemText primary="Facility Type – What kind of facility it is (e.g., warehouse, port)" /></ListItem>
          <ListItem><ListItemText primary="Street Address" /></ListItem>
          <ListItem><ListItemText primary="City" /></ListItem>
          <ListItem><ListItemText primary="State" /></ListItem>
          <ListItem><ListItemText primary="Zip Code" /></ListItem>
          <ListItem><ListItemText primary="Country" /></ListItem>
          <ListItem><ListItemText primary="FIRMS Status – Status or category of the facility" /></ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Handy Tip: Keyboard Shortcut
        </Typography>
        <Typography>
          Just press <strong>Enter</strong> on your keyboard after typing in your search — no need to click!
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          How to Save the Results
        </Typography>
        <List>
          <ListItem><ListItemText primary="Click Export to CSV." /></ListItem>
          <ListItem><ListItemText primary="A file will download to your computer." /></ListItem>
          <ListItem><ListItemText primary="Open it in Excel, Google Sheets, or similar programs." /></ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Troubleshooting Tips
        </Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell><strong>“Loading data…” doesn’t go away</strong></TableCell>
              <TableCell>Refresh the page. Check that your internet is working.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>“No matches found”</strong></TableCell>
              <TableCell>Try using fewer words or check your spelling.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Reminder: This tool is for reference only. It’s not connected to any official government agency.
        Always double-check information before using it for business or legal decisions.
      </Typography>
    </Container>
  );
}
