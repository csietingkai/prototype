import React from 'react';
import { Table, Button } from 'react-bootstrap';

import util from 'js/util/util'

const heads = {
    user: [
        { title: 'id', show: false, type: 'string' },
        { title: 'name', show: true, type: 'string' },
        { title: 'email', show: true, type: 'string' },
        { title: 'role', show: true, type: 'string' },
        { title: 'operations', show: true, type: 'btns' }
    ],
    item: [
        { title: 'id', show: false, type: 'string' },
        { title: 'name', show: true, type: 'string' },
        { title: 'price', show: true, type: 'string' },
        { title: 'operations', show: true, type: 'btns' }
    ],
    file: [
        { title: 'id', show: false, type: 'string' },
        { title: 'filename', show: true, type: 'string' },
        { title: 'size', show: true, type: 'fileSize' },
        { title: 'uploadDate', show: true, type: 'date' },
        { title: 'md5', show: false, type: 'string' },
        { title: 'metadata', show: false, type: 'string' },
        { title: 'operations', show: true, type: 'btns' }
    ]
};

const getColumns = (list) => {
    let columns = [];
    if (Array.isArray(list)) {
        for (let item of list) {
            columns.push(...Object.keys(item));
        }
    }
    columns = [...new Set(columns)].map((column) => {
        return {
            title: column,
            show: true,
            type: 'string'
        }
    });
    return columns;
}

const renderTableHead = (columns) => {
    let headInfo = columns.filter((column) => {
        return column.show;
    }).map((column) => {
        return (
            <th key={column.title}>{column.title}</th>
        );
    });
    return (
        <thead>
            <tr>
                {headInfo}
            </tr>
        </thead>
    );
}

const renderOperationBtns = (openEditModal, deleteFunction) => {
    return (
        <>
            <Button variant='primary' size='sm' onClick={openEditModal}>
                <i className='fa fa-edit'></i>
            </Button>{' '}
            <Button variant='danger' size='sm' onClick={deleteFunction}>
                <i className='fa fa-trash'></i>
            </Button>
        </>
    );
}

const renderTableBody = (list, columns, openEditModal, deleteFunction) => {
    let rows = null;
    if (list.length > 0) {
        rows = list.map((item, itemIndex) => {
            let cells = columns.filter((column) => {
                return column.show;
            }).map((column, columnIndex) => {
                let tdKey = itemIndex + '-' + columnIndex;
                let tdValue = item[column.title];
                switch (column.type) {
                    case 'date':
                        tdValue = util.formatDateTime(new Date(tdValue));
                        break;
                    case 'btns':
                        tdValue = renderOperationBtns(openEditModal, deleteFunction);
                        break;
                    case 'fileSize':
                        tdValue = util.formatFileSize(tdValue);
                        break;
                    case 'string':
                    case 'number':
                    default:
                        break;
                }
                return (
                    <td key={tdKey}>{tdValue}</td>
                );
            });
            return (
                <tr key={itemIndex}>
                    {cells}
                </tr>
            );
        });
    } else {
        rows = (
            <tr>
                <td colspan={columns.length} className='text-center'>Empty</td>
            </tr>
        );
    }
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

const renderTable = (list, type, openEditModal, deleteFunction) => {
    if (!util.isFunction(openEditModal)) {
        //console.warn('openEditModal is not a function, edit button will not do nothing');
    }
    if (!util.isFunction(deleteFunction)) {
        //console.warn('deleteFunction is not a function, delete button will not do nothing');
    }

    let columns = null;
    if (heads[type]) {
        columns = heads[type];
    }
    else {
        //console.warn('render table by list items\' key, if list is empty array will get error');
        columns = getColumns(list);
    }

    if (!columns || columns.length === 0) {
        //console.error('There is no Column can be shown, Table rendering stop');
        return;
    }

    let thead = renderTableHead(columns);
    let tbody = renderTableBody(list, columns, openEditModal, deleteFunction);
    return (
        <Table striped bordered hover>
            {thead}
            {tbody}
        </Table>
    );
}

export default renderTable;