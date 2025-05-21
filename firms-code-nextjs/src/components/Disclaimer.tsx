import { Box, Typography } from '@mui/material';

export default function Disclaimer() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        <strong>Disclaimer:</strong> This tool and its associated data are provided for informational purposes only and are 
        made available to the public "as is." We make no warranties or representations regarding the accuracy, completeness, 
        reliability, or timeliness of the data. While efforts have been made to ensure the accuracy of the FIRMS Code information, 
        the data may contain errors or become outdated. Users are solely responsible for verifying any information before 
        relying on it for official, legal, or business purposes.
        The FIRMS data presented here is based on publicly available U.S. government information. This project is independently developed and is not affiliated with, endorsed by, or sponsored 
        by any U.S. government agency.
        We assume no liability for any direct, indirect, incidental, or consequential damages arising from the use or misuse of 
        this tool or the data it provides.
      </Typography>
    </Box>
  );
} 