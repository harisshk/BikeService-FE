import React, { useEffect, useState } from "react";
import Table from '../../../components/Table'
import { AlertSnackbar } from "../../../components/Snackbar";
import Loader from '../../../components/Loader'
import { getAllServices, updateService } from "../../../services/servicesService";
import dateFormat from "dateformat";
import ToolbarTab from "../../../components/Toolbar/Toolbar";
import { Chip } from 'primereact/chip';
import { addFilter, filterByType } from '../../../utils/FilterbyType/filterByType'
import ServiceEdit from "../../../components/Dialog/ServiceEdit";
import DeleteDialog from "../../../components/Dialog/DeleteDialog";

const OwnerServiceList = () => {
    const [services, setServices] = useState([])
    const [copyServices, setCopyServices] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const [editData, setEditData] = useState({
        isEdit: false,
        data: {}
    })
    const [deleteAction, setDeleteAction] = useState({
        isDeleteModalOpen: false,
        data: {}
    })
    const [filter, setFilter] = useState(["REQUESTED"])

    const columns = [
        { title: "Owner Name", field: "owner.name" },
        { title: "Bike Make", field: "bike.bikeMake" },
        { title: "Bike Model", field: "bike.bikeModel" },
        { title: "Estimated amount", field: "serviceAmount" },
        {
            title: "Status", field: "status",
            render: (rowData) => {
                switch (rowData?.status) {
                    case "PENDING":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#fff3c9", borderRadius: "10px", color: "#d68b00"
                        }} >
                            Pending
                        </p>)
                    case "REQUESTED":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#fff3c9", borderRadius: "10px", color: "#d68b00"
                        }} >
                            Requested
                        </p>)
                    case "COMPLETED":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#b2fa8e", borderRadius: "10px", color: "#267300"
                        }} >
                            Completed
                        </p>)
                    case "READYFORDELIVERY":
                        return (<p style={{
                            padding: "2px", margin: "0 1rem",
                            background: "#b2fa8e", borderRadius: "10px", color: "#267300"
                        }} >
                            Ready for Delivery
                        </p>)
                    default:
                        break;
                }
            }
        },
        {
            title: "Booked for ",
            field: "createdAt",
            render: (rowData) => {
                return (
                    <div>
                        <p style={{ margin: "0px" }}>{dateFormat(rowData.bookedDate, "mmm dS, yyyy ")}
                        </p>
                    </div>
                );
            },
        },
    ];
    const fetchData = async () => {
        setIsLoading(true)
        const response = await getAllServices()
        const { success, data } = response
        if (success) {
            filterByType(filter, data)
            setServices(filterByType(filter, data))
            setCopyServices(response.data)
        }
        else {
            setSnackbarOpen(false)
            setSnackbarInfo({
                message: "Cannot fetch data",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    const updateHandler = async (status, serviceAmount, id) => {
        setIsLoading(true)
        const response = await updateService(
            { status, serviceAmount }, id
        )
        const { success } = response
        if (success) {
            fetchData()
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data updated",
                variant: "success",
            })
        }
        else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data cannot be updated",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    const deleteHandler = async (id) => {
        setIsLoading(true)
        const response = await updateService(
            { isDelete: true }, id
        )
        const { success } = response
        if (success) {
            fetchData()
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data updated",
                variant: "success",
            })
        }
        else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data cannot be updated",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const filterHandlerType = (value) => {
        const response = addFilter(filter, value)
        setFilter(response)
        setServices(filterByType(response, copyServices))
    }
    const leftTabContents = (
        <React.Fragment>
            <div style={{ marginLeft: "10px" }} onClick={() => {
                filterHandlerType("REQUESTED")
            }}>
                <Chip label="Requested" style={(filter?.includes("REQUESTED")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff", cursor: 'pointer' } : {}} className={"toolbarButton"} />
            </div>
            <div style={{ marginLeft: "10px" }} onClick={() => {
                filterHandlerType("PENDING")
            }}>
                <Chip label="Pending" style={(filter?.includes("PENDING")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff" } : {}} className="toolbarButton" />
            </div>
            <div style={{ marginLeft: "10px" }} onClick={() => {
                filterHandlerType("READYFORDELIVERY")
            }}>
                <Chip label="Deliver Ready" style={(filter?.includes("READYFORDELIVERY")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff" } : {}} className="toolbarButton" />
            </div>
            <div style={{ marginLeft: "10px" }} onClick={() => {
                filterHandlerType("COMPLETED")
            }}><Chip label="Completed" style={(filter?.includes("COMPLETED")) ? { backgroundColor: "rgb(94,113,228)", color: "#fff" } : {}} className="toolbarButton" /></div>
        </React.Fragment>
    )
    return (
        <>
            <ToolbarTab leftContents={leftTabContents} />
            <Table data={services} columns={columns} editable onEdit={(data) => {
                setEditData({ isEdit: true, data })
            }} canDelete onDelete={(data) => {
                setDeleteAction({ isDeleteModalOpen: true, data })
            }} />
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
            <ServiceEdit data={editData?.data} open={editData?.isEdit} onHide={() => {
                setEditData({
                    isEdit: false,
                    data: {}
                })
            }} onSubmit={(status, serviceAmount, id) => {
                updateHandler(status, serviceAmount, id)
                setEditData({
                    isEdit: false,
                    data: {}
                })
            }} />
            <DeleteDialog data={deleteAction?.data} open={deleteAction?.isDeleteModalOpen} onDelete={(id) => {
                deleteHandler(id)
                setDeleteAction({
                    isDeleteModalOpen: false,
                    data: {}
                })
            }} onClose={() => setDeleteAction({
                isDeleteModalOpen: false,
                data: {}
            })} />
        </>
    )
}

export default OwnerServiceList