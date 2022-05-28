import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';

const ProductsCard = (props) => (

    <Card
        style={{ height: '100%' }}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                style={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                    >
                        {props?.title}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.count}
                    </Typography>
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }} >
                    <Avatar
                        sx={{
                            height: 34,
                            width: 34
                        }}
                    >
                        {props?.children}
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >

            </Box>
        </CardContent>
    </Card>
);

export default ProductsCard;
