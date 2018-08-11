import axios from 'axios';
import React from 'react';

import PaginationSelector from './common/PaginationSelector';
import PaginationDisplaying from './common/PaginationDisplaying';
import UsersTable from './UsersTable';

/**
 * The table should show only 10 users at a time.
 */
const USERS_PER_PAGE = 10;

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            users: [],
        };
    }

    /**
     * The data should be loaded once per page load via AJAX from https://randomuser.me
     */
    componentDidMount() {
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

    /**
     * There should be a page indicator below the table showing which users are visible.
     * There should be controls below the table to go to next page, previous page, etc.
     * If there is no previous or next page, the links should be hidden or disabled.
     */
    render() {
        return (
            <div>
                <h1>Users ({this.state.users.length})</h1>
                <UsersTable
                    page={this.state.page}
                    users={this.state.users}
                    usersPerPage={USERS_PER_PAGE}
                />
                <div>
                    <PaginationDisplaying
                        itemsPerPage={USERS_PER_PAGE}
                        itemsTotal={this.state.users.length}
                        page={this.state.page}
                    />
                    <PaginationSelector
                        className="pull-right"
                        itemCount={this.state.users.length}
                        itemsPerPage={USERS_PER_PAGE}
                        page={this.state.page}
                        setPage={(page) => { this.setState({ page: page })}}
                    />
                </div>
            </div>
        );
    }
}

export default UsersPage;