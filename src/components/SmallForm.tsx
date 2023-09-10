import {
    Container,
    Paper,
    Typography,
    Divider
} from "@mui/material"

import { ReactNode } from "react"

interface Props {
    title: string
    children: ReactNode
}

export default function SmallForm({ title, children }: Props) {
    return (
        <Container maxWidth="md" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
        }}>
            <Paper elevation={5} sx={{
                width: '20rem',
                padding: '2rem 1.5rem',
                borderRadius: '20px'
            }}>
                <Typography sx={{ textAlign: 'center' }} variant="h4">{title}</Typography>
                <Divider variant="middle" sx={{ mt: 2, mb: 3 }} />
                {children}
            </Paper>
        </Container >
    )
}