import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './index.css'
import { Button } from 'primereact/button';
import { AlertSnackbar } from "../Snackbar";

export const Table = (props) => {
    const { data, columns, deleteAction, editable, onEdit, isFilter, onFilterClear, onFilter, profileView, isExport, onExport } = props
    const [globalFilter, setGlobalFilter] = useState("")
    const [snackbarInfo, setSnackbarInfo] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // const reset = () => {
    //     setGlobalFilter('');
    //     setGlobalFilter('');
    // }

    const customAction = (e) => {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} onClick={() => {
                setUser(e)
                setDialog(true)
            }} >
                {localStorage.getItem("role") === "admin" && <Button label='Reset Password' />}
                {editable && <Tooltip title="Edit">
                    <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                        onEdit(e)
                    }} className="pi pi-pencil"></EditIcon>
                </Tooltip>}
                {deleteAction && <Tooltip title="Delete">
                    <DeleteIcon style={{ cursor: "pointer", marginLeft: "20px" }} onClick={() => {
                        // setOpenDeleteDialog(true)
                        // setDeleteData(e)
                    }} className="pi pi-trash"></DeleteIcon>
                </Tooltip>}
            </div>
        )
    }

    const header = (
        <div className="table-header" style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                {isExport && <Button type="button" icon="pi pi-file-o" onClick={() => onExport()} className="p-mr-2" data-pr-tooltip="CSV" label="Export" />
                }
            </div>
            <div>
                {/* {!profileView && <Button type="button" icon="pi pi-filter" onClick={() => onFilter()} className=" m-1 p-ml-auto" data-pr-tooltip="Filter" />}
                {isFilter && <Button type="button" label={'Clear'} onClick={() => {
                    onFilterClear()
                }} className="m-1 p-button-danger p-button-outlined" />}
                &nbsp;&nbsp; */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
                </span>
            </div>
        </div>
    );
    return (
        <div className="datatable-responsive-demo">
            <DataTable value={data}
                editMode="row"
                header={header}
                dataKey="_id"
                removableSort
                paginator
                rows={10}
                globalFilter={globalFilter}
                // className="p-datatable-responsive-demo"
                responsiveLayout="scroll"
                sortMode="single"
            //showGridlines
            >
                {columns && columns.map((column) => {
                    return (
                        <Column style={{
                            ...column.style,
                            textAlign: "center"
                        }
                        }
                            headerStyle={{  fontWeight: 600, backgroundColor: "#e6eaed" }}
                            key={column.field}
                            alignHeader={'center'}
                            field={column?.field} 
                            header={column.title}
                            body={column.render ? column.render : false}
                            sortable={column.sort ? column.sort : false}
                            filter={column.filter ? column.filter : false}
                            filterPlaceholder={column.filterPlaceholder ? column.filterPlaceholder : ""}
                            filterElement={column.filterElement}
                        />
                    )
                })}
                {(deleteAction || editable) && <Column headerStyle={{ textAlign: "center", fontWeight: 600, backgroundColor: "#e6eaed" }} header="Actions" body={(e) => customAction(e)}
                    style={{ textAlign: "center", justifyContent: "center" }}
                ></Column>}
            </DataTable>

            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
        </div>

    )
}
export default Table