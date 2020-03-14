import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import file from 'js/api/file';
import LogFactory from 'js/component/util/LogFactory';
import Table from 'js/component/util/Table';
import notify from 'js/util/notify';

export default class UploadPage extends Component {

    static logger = LogFactory.getLogger(UploadPage.name);

    constructor(props) {
        super(props)
        this.fetchRepositories();
        this.state = {
            repositories: []
        };
    }

    fetchRepositories = async () => {
        let repositories = await file.getFileRepositories();
        this.state.repositories = []
        repositories.data.map(async (repositoryName) => {
            let fileList = await file.getFileList(repositoryName);
            fileList = fileList.data;
            let repositories = this.state.repositories;
            repositories.push({
                name: repositoryName,
                title: repositoryName.replace('Repository', ''),
                list: fileList
            });
            UploadPage.logger.debug("init repositories done.");
            this.setState({
                repositories
            });
        });
    }

    onFileChange = (event) => {
        UploadPage.logger.debug('filename change to ' + event.target.files[0].name);
        this.setState({
            file: event.target.files[0]
        });
    }

    uploadFile = () => {
        file.upload(this.state.file).then((response) => {
            if (response.success) {
                notify.success(response.message);
            } else {
                notify.error(response.message);
            }
            this.fetchRepositories();
            this.setState({
                file: null
            })
        })
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

    deleteFile = (id) => {
        this.setState({
            deleted: false
        });
        let filename = null;
        this.state.repositories.forEach((repository) => {
            repository.list.forEach((file) => {
                if (file.id === id) {
                    filename = file.filename;
                }
            });
        });
        file.remove(filename, id).then((response) => {
            if (response.success) {
                notify.success(response.message);
            } else {
                notify.error(response.message);
            }
            this.fetchRepositories();
        });
    }

    render() {
        let tabs = this.state.repositories.map((repository) => {
            let table = null;
            if (repository) {
                // TODO edit function
                table = <Table list={repository.list} type='file' downloadFunction={this.downloadFile} deleteFunction={this.deleteFile} />
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
                <br />
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" onChange={this.onFileChange} />
                        <label className="custom-file-label">{this.state.file ? this.state.file.name : 'Choose file'}</label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.uploadFile}>upload</button>
                    </div>
                </div>
                <br />
                <Tabs defaultActiveKey='profile'>
                    {tabs}
                </Tabs>
            </>
        );
    }
}