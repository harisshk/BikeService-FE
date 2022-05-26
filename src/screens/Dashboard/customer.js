import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// material
import { Grid, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// components
import PageContainer from '../../components/Page';
import DashboardCard from '../../components/Card';

//services
import { getDashboardCustomer } from '../../services/userService';
// ----------------------------------------------------------------------

export function CustomerDashboard() {
    const [countData, setCountData] = useState({
        bikeCount: 0,
        pendingService: 0,
        completedService: 0,
    })
    const profileData = useSelector(data => data?.profile)

    const fetchDashboardInfo = async () => {
        const response = await getDashboardCustomer(profileData?.id)
        console.log(response)
        const { success, data } = response
        if (success) {
            setCountData({
                bikeCount: data?.bikeData,
                serviceData: data?.serviceData
            })
        }
    }

    useEffect(() => {
        fetchDashboardInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageContainer title="Dashboard">
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {countData?.serviceData && countData?.serviceData?.map((item) => {
                        return (
                            <Grid key={item?.status} item xs={12} sm={6} md={4}>
                                <DashboardCard title={`${item?.status} SERVICE`} color={''} count={item?.qty} >
                                    <BuildIcon />
                                </DashboardCard>
                            </Grid>
                        )
                    })}
                    <Grid item xs={12} sm={6} md={4}>
                        <DashboardCard title={"BIKES"} color={''} count={countData?.bikeCount} >
                            <TwoWheelerIcon />
                        </DashboardCard>
                    </Grid>
                </Grid>
            </Container>
        </PageContainer>
    );
}

export default CustomerDashboard