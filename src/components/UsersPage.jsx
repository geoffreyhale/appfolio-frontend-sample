import axios from "axios";
import React from "react";

import PageSelector from './PageSelector.jsx';
import UsersTable from './UsersTable.jsx';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            sort_key: null, //first, last, email
            sort_dir: null, // asc, desc
            users: [],
            users_per_page: 10, // The table should show only 10 users at a time.
        };
    }

    componentDidMount() {
        // The data should be loaded once per page load via AJAX from https://randomuser.me
        axios.get('https://randomuser.me/api/?results=500')
            .then(function (response) {
                const users = response.data.results.map((user) => {
                    return {
                        first: user.name.first,
                        last: user.name.last,
                        email: user.email,
                    }
                });
                this.setState({
                    users: users,
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getSortedUsers() {
        return _.orderBy(this.state.users, [this.state.sort_key], [this.state.sort_dir]);
    }

    getUsersForPage() {
        const users = this.getSortedUsers();

        return users.slice(
            (this.state.page - 1) * this.state.users_per_page,
            this.state.page * this.state.users_per_page
        );
    }

    // There should be a page indicator below the table showing which users are visible
    getPageDetails() {
        const lowIndex = (this.state.page - 1) * this.state.users_per_page + 1;
        const highIndex = Math.min((this.state.page) * this.state.users_per_page, this.state.users.length);

        return (
            <span>Displaying: {lowIndex}-{highIndex} of {this.state.users.length}</span>
        );
    }

    // The table should be sortable by each column.
    sortOnKey(sort_key, e) {
        e.preventDefault();

        if (this.state.sort_key != sort_key) {
            // Clicking on a new column will sort the new column ascending.
            this.setState({
                sort_key: sort_key,
                sort_dir: 'asc'
            })
        } else {
            // Clicking on the currently sorted column will reverse the sort direction.
            this.setState({
                sort_dir: this.state.sort_dir === 'asc' ? 'desc' : 'asc'
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Users ({this.state.users.length})</h1>
                <UsersTable
                    sortDir={this.state.sort_dir}
                    sortKey={this.state.sort_key}
                    sortOnKey={this.sortOnKey.bind(this)}
                    users={this.getUsersForPage()}
                />
                <div>
                    {this.getPageDetails()}
                    <PageSelector
                        className="pull-right"
                        itemCount={this.state.users.length}
                        itemsPerPage={this.state.users_per_page}
                        page={this.state.page}
                        setPage={(page) => { this.setState({ page: page })}}
                    />
                </div>
            </div>
        );
    }
}

export default UsersPage;