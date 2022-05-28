import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './index.css'

export const Table = (props) => {
    const { data, columns, canDelete, editable, onEdit, onDelete} = props
    const [globalFilter, setGlobalFilter] = useState("")

    const customAction = (e) => {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} onClick={() => {
            }} >
                {editable && <Tooltip title="Edit">
                    <EditIcon style={{ cursor: "pointer" }} onClick={() => {
                        onEdit(e)
                    }} className="pi pi-pencil"></EditIcon>
                </Tooltip>}
                {canDelete && <Tooltip title="Delete">
                    <DeleteIcon style={{ cursor: "pointer", marginLeft: "20px" }} onClick={() => {
                        onDelete(e)
                    }} className="pi pi-trash"></DeleteIcon>
                </Tooltip>}
            </div>
        )
    }

    const header = (
        <div className="table-header" style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
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
                responsiveLayout="scroll"
                sortMode="single"
            >
                {columns && columns.map((column) => {
                    return (
                        <Column style={{
                            ...column.style,
                            textAlign: "center"
                        }
                        }
                            headerStyle={{ fontWeight: 600, backgroundColor: "#e6eaed" }}
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
                {(canDelete || editable) && <Column headerStyle={{ textAlign: "center", fontWeight: 600, backgroundColor: "#e6eaed" }} header="Actions" body={(e) => customAction(e)}
                    style={{ textAlign: "center", justifyContent: "center" }}
                ></Column>}
            </DataTable>
        </div>

    )
}
export default Table