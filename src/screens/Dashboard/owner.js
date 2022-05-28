import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// material
import { Grid, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
// components
import PageContainer from '../../components/Page';
import DashboardCard from '../../components/Card';
import Loader from '../../components/Loader'
//services
import { getDashboardOwner } from '../../services/userService';
// ----------------------------------------------------------------------

export function OwnerDashboard() {
    const [countData, setCountData] = useState({
        bikeCount: 0,
        pendingService: 0,
        completedService: 0,
    })
    const [isLoading, setIsLoading] = useState(false)

    const fetchDashboardInfo = async () => {
        setIsLoading(true)
        const response = await getDashboardOwner()
        const { success, data } = response
        if (success) {
            setCountData({
                serviceData: data?.serviceData
            })
        }
        setIsLoading(false)
    }
    const getStatus = (key) => {
        switch (key) {
            case "PENDING":
                return 'Pending Services'
            case "REQUESTED":
                return 'Requested Services'
            case "COMPLETED":
                return 'Completed Services'
            case "READYFORDELIVERY":
                return 'Ready for delivery'
            default:
                break;
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
                                <DashboardCard title={`${getStatus(item?.status)}`} color={''} count={item?.qty} >
                                    <BuildIcon />
                                </DashboardCard>
                            </Grid>
                        )
                    })}

                </Grid>
            </Container>
            <Loader open={isLoading} />
        </PageContainer>
    );
}

export default OwnerDashboard