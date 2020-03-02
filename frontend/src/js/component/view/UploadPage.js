import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import file from 'js/api/file';
import { Divider } from '@material-ui/core';
import Table from 'js/component/util/Table';

export default class UploadPage extends Component {

    constructor(props) {
        super(props)
        this.fetchRepositories();
        this.state = {
            repositories: []
        };
    }

    fetchRepositories = async () => {
        let repositories = await file.getFileRepositories();
        repositories.data.map(async (repositoryName) => {
            let fileList = await file.getFileList(repositoryName);
            fileList = fileList.data;
            let repositories = this.state.repositories;
            repositories.push({
                name: repositoryName,
                title: repositoryName.replace('Repository', ''),
                list: fileList
            });
            this.setState({
                repositories
            });
        });
    }

    downloadFile = (filename) => {
        file.download(filename).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
    }

    render() {
        let tabs = this.state.repositories.map((repository) => {
            let table = null;
            if (repository) {
                // TODO edit function
                table = <Table list={repository.list} type='file' downloadFunction={this.downloadFile} />
            }
            return (
                <Tab eventKey={repository.name} key={repository.name} title={repository.title}>
                    {table}
                </Tab>
            );
        });
        tabs.sort((a, b) => {
            return a.key.localeCompare(b.key);
        })
        return (
            <>
                <Divider className='sidebar-divider' />
                <Tabs defaultActiveKey='profile'>
                    {tabs}
                </Tabs>
            </>
        );
    }
}