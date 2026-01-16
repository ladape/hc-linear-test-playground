import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

export const Page = styled(Box)({
  minHeight: '100vh',
  padding: '48px 32px',
  background: 'linear-gradient(145deg, var(--main-color), #042831 60%)',
  color: 'var(--text-color-light)',
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
});

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Card = styled(Paper)({
  padding: '20px',
  borderRadius: '18px',
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
});

export const Title = styled(Typography)({
  fontWeight: 700,
  color: 'var(--primary-color)',
  letterSpacing: '.4px',
});

export const Subtitle = styled(Typography)({
  color: 'var(--text-color-lighter)',
});

export const TableContainer = styled('div')({
  overflowX: 'auto',
});

export const TableStyle = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  'th, td': {
    padding: '12px 10px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  'th': {
    color: 'var(--text-color-lighter)',
    fontSize: '0.95rem',
  },
  'td': {
    color: 'var(--text-color-light)',
    fontSize: '0.95rem',
  },
});

