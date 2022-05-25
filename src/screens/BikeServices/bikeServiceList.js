import React, { useEffect, useState } from "react";
import { getPendingApplications, changeApplicationStatus } from '../../services/applicationService'
import Table from '../../components/table'
import { Button } from "@mui/material";
import AudioDialog from "../../components/Dialog/audio";
import IdDialog from "../../components/Dialog/institutionId";
import ApplicationDialog from "../../components/Dialog/application";
import { AlertSnackbar } from "../../components/snackbar";
import Loader from '../../components/Loader/Loader'
import Preview from '../../components/Dialog/preview';

const ApplicationList = () => {
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [audioDetails, setAudioDetails] = useState({
        isEdit: false,
        url: ''
    })
    const [idDetails, setIdDetails] = useState({
        isOpen: false,
        url: ''
    })
    const [changeStatus, setChangeStatus] = useState({
        isOpen: false,
        id: '',
        status: '',
        name: ''
    })
    const [preview, setPreview] = useState({
        isOpen: false,
        data: {}
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const columns = [
        { title: "Name", field: "applicant.name" },
        { title: "Email", field: "applicant.email" },
        { title: "Institution", field: "institutionName" },
        { title: "Competency Level", field: "competencyLevel" },
        {
            title: "Recording",
            render: (rowData) => {
                return (
                    <Button onClick={() => {
                        setAudioDetails({
                            url: rowData?.recording,
                            isEdit: true
                        })
                    }}>Play audio</Button>
                )
            },
        },
        {
            title: "Institution Id",
            render: (rowData) => {
                return (
                    <Button onClick={() => {
                        setIdDetails({
                            url: rowData?.institutionId,
                            isOpen: true
                        })
                    }}>View ID</Button>
                )
            },
        },
        {
            title: 'Preview',
            render: (rowData) => {
                return(
                    <Button variant="outlined" onClick={()=>{
                        setPreview({
                            isOpen: true,
                            data: {
                                ...rowData,
                                ...rowData?.applicant,
                                college:rowData?.institutionName,
                                competency:rowData?.competencyLevel
                            }
                        })
                    }}>Preview</Button>
                )
            }
        },
        {
            title: "Actions",
            render: (rowData) => {
                return (
                    <>
                        <Button variant="outlined" style={{ margin: '2px 5px' }} onClick={() => {
                            setChangeStatus({
                                id: rowData?._id,
                                isOpen: true,
                                status: 'Accept',
                                name: rowData?.applicant?.name
                            })
                        }} >Accept</Button> 
                        <Button color="error" variant="outlined" style={{ margin: '2px 5px' }} onClick={() => {
                            setChangeStatus({
                                id: rowData?._id,
                                isOpen: true,
                                status: 'Reject',
                                name: rowData?.applicant?.name
                            })
                        }} >Reject</Button>
                    </>
                )
            },
        },
    ];
    const fetchApplications = async () => {
        setIsLoading(true)
        const response = await getPendingApplications()
        const { error, data } = response
        if (error === false) {
            setApplications(data)
        }
        setIsLoading(false)
    }
    const changeStatusHandler = async (data) => {
        const response = await changeApplicationStatus(data)
        const { error } = response
        if (error === false) {
            setSnackbarInfo({
                message: "Application status changed successfully",
                variant: "success",
            });
            setSnackbarOpen(true);
            fetchApplications()
        } else {
            setSnackbarInfo({
                message: "Application status cannot be changed",
                variant: "error",
            });
            setSnackbarOpen(true);
        }
    }
    useEffect(() => {
        fetchApplications()
    }, [])
    return (
        <>
            <Table data={applications} columns={columns} />
            <AudioDialog open={audioDetails?.isEdit} onHide={() => {
                setAudioDetails({
                    isEdit: false,
                    url: ''
                })
            }} data={audioDetails?.url} />
            <IdDialog open={idDetails?.isOpen} onHide={() => {
                setIdDetails({
                    isOpen: false,
                    url: ''
                })
            }} data={idDetails} />
            <ApplicationDialog data={changeStatus} open={changeStatus?.isOpen} onHide={() => {
                setChangeStatus({
                    isOpen: false,
                    status: '',
                    id: ' ',
                    name: ''
                })
            }}
                onStatusChange={(data) => {
                    changeStatusHandler(data)
                }}
            />
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
            <Preview open={preview?.isOpen} isSubmit={false} data={preview?.data} onHide={() => {
                setPreview({
                    isOpen: false,
                    data: {}
                })
      }}  />
        </>
    )
}

export default ApplicationList