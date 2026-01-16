import { styled } from '@mui/material/styles';
import { Box, Button as MuiButton } from '@mui/material';

export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const FormRow = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'flex-start',
});

export const FormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
});

export const Label = styled('label')({
  fontSize: '14px',
  fontWeight: 700,
  color: 'var(--text-color-light)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  minWidth: '140px',
  paddingTop: '12px',
  display: 'block',
});

export const Input = styled('input')({
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: '2px solid var(--border-color)',
  borderRadius: '6px',
  backgroundColor: 'var(--background-color-light)',
  color: 'var(--text-color-dark)',
  fontFamily: 'inherit',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',

  '&::placeholder': {
    color: 'var(--text-color-lighter)',
  },

  '&:focus': {
    outline: 'none',
    backgroundColor: 'var(--background-color-light)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 3px var(--main-color-30)',
  },

  '&:hover': {
    borderColor: 'var(--primary-color-hover)',
    backgroundColor: 'var(--background-color-light)',
  },
});

export const Select = styled('select')({
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: '2px solid var(--border-color)',
  borderRadius: '6px',
  backgroundColor: 'var(--main-color)',
  color: 'var(--text-color-light)',
  fontFamily: 'inherit',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  appearance: 'none',
  boxSizing: 'border-box',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231BE29A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '18px',
  paddingRight: '36px',

  '&:focus': {
    outline: 'none',
    backgroundColor: 'var(--main-color-50)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 3px var(--main-color-30)',
  },

  '&:hover': {
    borderColor: 'var(--primary-color-hover)',
    backgroundColor: 'var(--main-color-50)',
  },

  '& option': {
    backgroundColor: 'var(--main-color)',
    color: 'var(--text-color-light)',
    padding: '8px 10px',
  },
});

export const ErrorMessage = styled(Box)({
  fontSize: '12px',
  color: 'var(--cancel-delete-button-color)',
  fontWeight: 600,
  display: 'block',
  marginTop: '4px',
  animation: 'slideIn 0.2s ease-out',
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-2px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

export const InputWithError = styled(Box)<{ hasError?: boolean }>(({ hasError }) => ({
  '& input, & select': {
    borderColor: hasError ? 'var(--cancel-delete-button-color) !important' : 'var(--border-color)',
    backgroundColor: hasError ? 'rgba(229, 52, 43, 0.1)' : 'var(--main-color)',

    '&:focus': {
      borderColor: hasError ? 'var(--cancel-delete-button-color) !important' : 'var(--primary-color) !important',
      boxShadow: hasError
        ? '0 0 0 3px rgba(229, 52, 43, 0.15) !important'
        : '0 0 0 3px var(--main-color-30) !important',
    },
  },
}));

export const FormFooter = styled(Box)({
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
});

export const Button = styled(MuiButton)<{ buttonVariant?: 'primary' | 'secondary' }>(({ buttonVariant = 'primary' }) => ({
  padding: '10px 24px',
  fontSize: '13px',
  fontWeight: 700,
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  transition: 'all 0.3s ease',

  ...(buttonVariant === 'primary' ? {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--text-color-dark)',

    '&:hover:not(:disabled)': {
      backgroundColor: 'var(--primary-color-hover)',
      boxShadow: '0 6px 12px rgba(27, 226, 154, 0.3)',
      transform: 'translateY(-2px)',
    },

    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  } : {
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--text-color-light)',
    border: 'none',

    '&:hover': {
      backgroundColor: 'var(--secondary-color-hover)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  }),
}) as any);

export const FormTitle = styled('h3')({
  fontSize: '20px',
  fontWeight: 700,
  color: 'var(--text-color-light)',
  margin: '0 0 24px 0',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  borderBottom: '2px solid var(--primary-color)',
  paddingBottom: '12px',
});

