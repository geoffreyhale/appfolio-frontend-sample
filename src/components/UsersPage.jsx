import axios from 'axios';
import React from 'react';

import PaginationSelector from './common/PaginationSelector';
import PaginationDisplaying from './common/PaginationDisplaying';
import UsersTable from './UsersTable';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            sortKey: null, //first, last, email
            sortDir: null, // asc, desc
            users: [],
            usersPerPage: 10, // The table should show only 10 users at a time.
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
        return _.orderBy(this.state.users, [this.state.sortKey], [this.state.sortDir]);
    }

    getUsersForPage() {
        const users = this.getSortedUsers();

        return users.slice(
            (this.state.page - 1) * this.state.usersPerPage,
            this.state.page * this.state.usersPerPage
        );
    }

    // The table should be sortable by each column.
    sortOnKey(sortKey, e) {
        e.preventDefault();

        if (this.state.sortKey != sortKey) {
            // Clicking on a new column will sort the new column ascending.
            this.setState({
                sortKey: sortKey,
                sortDir: 'asc'
            })
        } else {
            // Clicking on the currently sorted column will reverse the sort direction.
            this.setState({
                sortDir: this.state.sortDir === 'asc' ? 'desc' : 'asc'
            });
        }
    }

    // There should be a page indicator below the table showing which users are visible
    // There should be controls below the table to go to next page, previous page, etc
    // If there is no previous or next page, the links should be hidden or disabled.
    render() {
        return (
            <div>
                <h1>Users ({this.state.users.length})</h1>
                <UsersTable
                    sortDir={this.state.sortDir}
                    sortKey={this.state.sortKey}
                    sortOnKey={this.sortOnKey.bind(this)}
                    users={this.getUsersForPage()}
                />
                <div>
                    <PaginationDisplaying
                        itemsPerPage={this.state.usersPerPage}
                        itemsTotal={this.state.users.length}
                        page={this.state.page}
                    />
                    <PaginationSelector
                        className="pull-right"
                        itemCount={this.state.users.length}
                        itemsPerPage={this.state.usersPerPage}
                        page={this.state.page}
                        setPage={(page) => { this.setState({ page: page })}}
                    />
                </div>
            </div>
        );
    }
}

export default UsersPage;