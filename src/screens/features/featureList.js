import React, { useEffect, useState } from "react";
import Table from '../../components/Table'
import { AlertSnackbar } from "../../components/Snackbar";
import Loader from '../../components/Loader'
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { getAllFeatures } from "../../services/featuresService";

const FeatureList = () => {
    const navigate = useNavigate()
    const [features, setFeatures] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
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
                            <p style={{ color: "#999999", margin: "0px" }}>
                                {dateFormat(rowData.createdAt, "shortTime")}
                            </p>
                        </p>
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
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <Table data={features} columns={columns} editable deleteAction onEdit={(data) => { navigate(`/features/edit/${data?._id}`) }} />
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
        </>
    )
}

export default FeatureList