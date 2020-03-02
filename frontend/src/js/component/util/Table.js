import React from 'react';
import PropTypes from 'prop-types';
import { Table as BsTable, Button } from 'react-bootstrap';

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

export default class Table extends React.Component {

    getColumns = (list) => {
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

    renderTableHead = (columns) => {
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

    renderOperationBtns = (row) => {
        let downloadBtn = null;
        if (this.props.type === 'file') {
            downloadBtn = (
                <Button variant='primary' size='sm' onClick={this.props.downloadFunction.bind(this, row['filename'])}>
                    <i className='fa fa-download'></i>
                </Button>
            );
        }
        return (
            <>
                {downloadBtn}
                {' '}
                <Button variant='primary' size='sm' onClick={this.props.openEditModal}>
                    <i className='fa fa-edit'></i>
                </Button>{' '}
                <Button variant='danger' size='sm' onClick={this.props.deleteFunction}>
                    <i className='fa fa-trash'></i>
                </Button>
            </>
        );
    }

    renderTableBody = (list, columns) => {
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
                            tdValue = this.renderOperationBtns(item);
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
                    <td colSpan={columns.length} className='text-center'>Empty</td>
                </tr>
            );
        }
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }

    render() {
        if (!util.isFunction(this.props.openEditModal)) {
            //console.warn('openEditModal is not a function, edit button will not do nothing');
        }
        if (!util.isFunction(this.props.deleteFunction)) {
            //console.warn('deleteFunction is not a function, delete button will not do nothing');
        }

        let columns = null;
        if (heads[this.props.type]) {
            columns = heads[this.props.type];
        }
        else {
            //console.warn('render table by list items\' key, if list is empty array will get error');
            columns = this.getColumns(this.props.list);
        }

        if (!columns || columns.length === 0) {
            //console.error('There is no Column can be shown, Table rendering stop');
            return;
        }

        let thead = this.renderTableHead(columns);
        let tbody = this.renderTableBody(this.props.list, columns, this.props.openEditModal, this.props.deleteFunction);
        return (
            <BsTable striped bordered hover>
                {thead}
                {tbody}
            </BsTable>
        );
    }
};

Table.propTypes = {
    list: PropTypes.array.isRequired,
    type: PropTypes.string,
    openEditModal: PropTypes.func,
    deleteFunction: PropTypes.func,
    downloadFunction: PropTypes.func
};