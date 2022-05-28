import React, { useEffect, useState } from "react";
import Table from '../../components/Table'
import { AlertSnackbar } from "../../components/Snackbar";
import Loader from '../../components/Loader'
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { getAllFeatures, editFeature } from "../../services/featuresService";
import DeleteDialog from "../../components/Dialog/DeleteDialog";

const FeatureList = () => {
    const navigate = useNavigate()
    const [features, setFeatures] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const [deleteAction, setDeleteAction] = useState({
        isDeleteModalOpen: false,
        data: {}
    })
    const columns = [
        { title: "Name", field: "name" },
        { title: "Estimated Amount", field: "estimatedAmount" },
        {
            title: "Added on",
            field: "createdAt",
            render: (rowData) => {
                return (
                    <div>
                        <p style={{ margin: "0px" }}>{dateFormat(rowData.createdAt, "mmm dS, yyyy ")}
                        </p>
                        <span style={{ color: "#999999", margin: "0px" }}>
                            {dateFormat(rowData.createdAt, "shortTime")}
                        </span>
                    </div>
                );
            },
        },
    ];
    const fetchData = async () => {
        setIsLoading(true)
        const response = await getAllFeatures()
        const { success, data } = response
        if (success) {
            setFeatures(data)
        } else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Features data cannot be fetched`,
                variant: "error",
            });
        }
        setIsLoading(false)
    }
    const deleteHandler = async (id) => {
        setIsLoading(true)
        const response = await editFeature(
            id, { isDeleted: true }
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
    }, [])
    return (
        <>
            <Table data={features} columns={columns} editable canDelete onDelete={(data) => {
                setDeleteAction({ isDeleteModalOpen: true, data })
            }} onEdit={(data) => { navigate(`/features/edit/${data?._id}`) }} />
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
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

export default FeatureList