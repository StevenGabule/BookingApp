import React, {Component} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit';
import {Link} from "react-router-dom";

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;

function ActionBtn(id) {
    return (
        <div className='btn-group' role="group">
            <Link to="/" className='btn btn-info btn-sm text-white'>Edit</Link>
            <Link to="/" className='btn btn-danger btn-sm'>Delete</Link>
        </div>
    )
}

 function AvatarRes (val) {
    return (
        <img src={val} alt="" style={{width: '30px', height: '30px'}}/>
    )
}

class Index extends Component {

    state = {
        products: [],
        columns: [
            {
                dataField: 'avatar',
                text: 'Avatar',
                formatter: AvatarRes,
                headerAttrs: { width: 50 },
                attr: {
                    width: 50
                }
            },
            {
                dataField: 'name',
                text: 'Product Name',
                sort: true
            },
            {
                dataField: 'short_description',
                text: 'Description'
            },
            {
                dataField: 'id',
                text: 'Actions',
                formatter: ActionBtn,
            }
        ]
    };



    componentDidMount() {
        axios.get('http://127.0.0.1:8000/Api/restaurants').then((res) => {
            this.setState({
                products: res.data.data
            });
        });
    }

    render() {
        return (
            <ToolkitProvider
                keyField="id"
                data={this.state.products}
                columns={this.state.columns}
                search>
                {
                    props => (
                        <div>

                            <h1>Restaurant Management</h1>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <ClearSearchButton {...props.searchProps} />
                                </div>
                                <div>
                                    <Link to='/restaurant/new' className='btn btn-secondary'>New</Link>
                                    <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
                                </div>
                            </div>

                            <hr/>

                            <BootstrapTable
                                {...props.baseProps}
                                bootstrap4
                                striped
                                hover
                                pagination={paginationFactory()}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        )
    }
}

export default Index;
