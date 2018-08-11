import {Table} from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import UsersTableRow from './UsersTableRow';
import SortableTableHeaderCell from './common/SortableTableHeaderCell';

class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: null, // first, last, email
            sortDir: null, // asc, desc
        };
    }

    /**
     * The table should be sortable by each column.
     */
    sortOnKey(sortKey, e) {
        e.preventDefault();

        /**
         * Clicking on a new column will sort the new column ascending.
         */
        if (this.state.sortKey != sortKey) {
            this.setState({
                sortKey: sortKey,
                sortDir: 'asc'
            })
        }
        /**
         * Clicking on the currently sorted column will reverse the sort direction.
         */
        else {
            this.setState({
                sortDir: this.state.sortDir === 'asc' ? 'desc' : 'asc'
            });
        }
    }

    getSortedUsers() {
        return _.orderBy(this.props.users, [this.state.sortKey], [this.state.sortDir]);
    }

    getUsersForPage() {
        const users = this.getSortedUsers();

        return users.slice(
            (this.props.page - 1) * this.props.usersPerPage,
            this.props.page * this.props.usersPerPage
        );
    }

    /**
     * Display the user's first name, last name, and email address in each column.
     */
    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <SortableTableHeaderCell
                        currentSortDir={this.state.sortDir}
                        currentSortKey={this.state.sortKey}
                        sortKey={'first'}
                        sortOnKey={this.sortOnKey.bind(this)}
                        text={'First'}
                    />
                    <SortableTableHeaderCell
                        currentSortDir={this.state.sortDir}
                        currentSortKey={this.state.sortKey}
                        sortKey={'last'}
                        sortOnKey={this.sortOnKey.bind(this)}
                        text={'Last'}
                    />
                    <SortableTableHeaderCell
                        currentSortDir={this.state.sortDir}
                        currentSortKey={this.state.sortKey}
                        sortKey={'email'}
                        sortOnKey={this.sortOnKey.bind(this)}
                        text={'Email'}
                    />
                </tr>
                </thead>
                <tbody>
                <Rows users={this.getUsersForPage()}/>
                </tbody>
            </Table>
        );
    }
}

UsersTable.propTypes = {
    page: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    usersPerPage: PropTypes.number,
};

const Rows = props => (
    _.map(props.users, (user, key) => {
        return (
            <UsersTableRow key={key} user={user} />
        );
    })
);

export default UsersTable;