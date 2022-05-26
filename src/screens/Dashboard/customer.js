import React, { useEffect, useState } from 'react';
// material
import { Grid, Container } from '@mui/material';
// components
import PageContainer from '../../components/Page';

// import StudentsCard from '../../components/cards/StudentsCard'
// import NewApplications from '../../components/cards/NewApplications';
// import AdminCard from '../../components/cards/AdminCard';
// import EvaluatorCard from '../../components/cards/EvaluatorCard';
// import ScreenerCard from '../../components/cards/ScreenerCard';

//services
// import { getAdminDashboardInfo } from '../../services/dashboardService';
// ----------------------------------------------------------------------

export function CustomerDashboard() {
    const [countData, setCountData] = useState({
        adminCount: 0,
        studentCount: 0,
        screenerCount: 0,
        evaluatorCount: 0,
        pendingApplicationCount: 0
    })
    // const fetchDashboardInfo = async () => {
    //     const response = await getAdminDashboardInfo()
    //     const { error, counts } = response
    //     if (error === false) {
    //         setCountData({ ...counts })
    //     }
    // }
    
    return (
        <PageContainer title="Dashboard">
            <Container maxWidth="xl">
                JK
                {/* <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewApplications title={"New Applications"} count={12} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AdminCard role={'Admin'} count={12} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EvaluatorCard role={'Evaluators'} count={12} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ScreenerCard role={'Screeners'} count={12} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StudentsCard role={'Students'} count={4} />
                    </Grid>
                </Grid> */}
            </Container>
        </PageContainer>
    );
}

export default CustomerDashboard