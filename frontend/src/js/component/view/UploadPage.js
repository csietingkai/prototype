import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import renderTable from 'js/component/util/Table'
import file from 'js/api/file';
import { Divider } from '@material-ui/core';

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

    render() {
        console.log(this.state.repositories);
        let tabs = this.state.repositories.map((repository) => {
            let table = null;
            if (repository) {
                // TODO edit function
                table = renderTable(repository.list, 'file', null, null);
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