import React from 'react';
import { Box, Typography, Stack, useTheme, Chip, Divider } from '@mui/material';
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const getBarWidth = (volume, maxVolume) => `${(volume / maxVolume) * 100}%`;

export default function OrderBook({ bids, asks, currentPrice, direction }) {
  const theme = useTheme();
  const maxVolume = Math.max(
    ...bids.map(b => b.volume),
    ...asks.map(a => a.volume)
  );

  return (
    <Box sx={{ p: 1 }}>
      {/* Sell Orders */}
      {[...asks].map((ask) => (
        <Stack key={ask.price} direction="row" alignItems="center" spacing={1} sx={{ height:'25px',position:'relative','&:hover': {backgroundColor: '#ef9a9a', cursor: 'pointer', }}}>
          <Box
            sx={{
              bgcolor: '#ef5350',
              height:'25px',
              width: getBarWidth(ask.volume, maxVolume),
              position: 'absolute',
              right: 0,
              zIndex: 0,
              opacity:0.3
            }}
          />
          <Typography variant='caption' sx={{ minWidth: 80, zIndex: 1 }}>{ask.price.toLocaleString()}</Typography>
          <Typography variant='caption' sx={{ flexGrow: 1, textAlign: 'right', zIndex: 1 }}>{ask.volume.toFixed(2)}M</Typography>
        </Stack>
      ))}

      {/* Current Price */}
      <Divider>
        <Stack direction="row" justifyContent="center" sx={{ height: 32, my: 1 }}>
          { direction=='up' ?(
            <Chip label={<Box sx={{display:'flex',alignItems:'center'}}><ArrowUpward sx={{height:'13px'}}/>${currentPrice.toFixed(2)}</Box>} variant='outlined' color="success" sx={{minWidth:'100px'}}/>
          ):(
            <Chip label={<Box sx={{display:'flex',alignItems:'center'}}><ArrowDownward sx={{height:'13px'}}/>${currentPrice.toFixed(2)}</Box>} variant='outlined' color="error" sx={{minWidth:'100px'}}/>
          )}
        </Stack>
      </Divider>

      {/* Buy Orders */}
      {bids.map((bid) => (
        <Stack key={bid.price} direction="row" alignItems="center" spacing={1} sx={{ height: '25px',position:'relative','&:hover': {backgroundColor: '#69f0ae', cursor: 'pointer', } }}>
          <Typography variant='caption' sx={{ minWidth: 80, zIndex: 1 }}>{bid.price.toLocaleString()}</Typography>
          <Typography variant='caption' sx={{ flexGrow: 1, textAlign: 'right', zIndex: 1 }}>{bid.volume.toFixed(2)}M</Typography>
          <Box
            sx={{
              bgcolor: '#00e676',
              height:'25px',
              width: getBarWidth(bid.volume, maxVolume),
              position: 'absolute',
              right: 0,
              zIndex: 0,
              opacity:0.3
            }}
          />
        </Stack>
      ))}
    </Box>
  );
}
