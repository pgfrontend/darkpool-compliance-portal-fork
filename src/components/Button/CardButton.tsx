import {
    Button,
    styled
} from '@mui/material'


export const CardButton = styled(Button)(({ theme }) => {
    return {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        textTransform: 'none',
        width: '100%',
        disableRipple: true,
        variant:"contained",
        disableFocusRipple: true,
        borderRadius: '9999px',
        margin: '15px 0',
        height: '48px',
        padding: '12px, 0px, 13.55px, 0px',
        textAlign: 'center',
        fontSize: '17px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '22px',
        letterSpacing: '-0.07px',
    }
})