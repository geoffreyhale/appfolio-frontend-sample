import {Table} from "react-bootstrap";
import _ from "lodash";
import PropTypes from 'prop-types';
import React from "react";

const UsersTable = props => {
    const getTableHeadCell = (key, name) => {
        // The table header should show which column is currently sorted by, and direction.
        let sortIcon = <i className="fa fa-fw fa-sort"></i>;
        if (props.sortKey == key) {
            if (props.sortDir == 'asc') {
                sortIcon = <i className="fa fa-fw fa-sort-up"></i>;
            } else if (props.sortDir == 'desc') {
                sortIcon = <i className="fa fa-fw fa-sort-down"></i>;
            }
        }

        return (
            <th onClick={(e) => props.sortOnKey(key, e)}>
                {name}
                {sortIcon}
            </th>
        )
    };

    // Display the user's first name, last name, and email address in each column.
    return (
        <Table striped bordered condensed hover>
            <thead>
            <tr>
                {getTableHeadCell('first', 'First')}
                {getTableHeadCell('last', 'Last')}
                {getTableHeadCell('email', 'Email')}
            </tr>
            </thead>
            <tbody>
            <Rows users={props.users}/>
            </tbody>
        </Table>
    );
};

UsersTable.propTypes = {
    sortDir: PropTypes.string, // asc, desc
    sortKey: PropTypes.string,
    sortOnKey: PropTypes.func,
    users: PropTypes.arrayOf(PropTypes.object),
};

const Rows = props => (
    _.map(props.users, (user, key) => {
        return <Row key={key} user={user} />;
    })
);

// Display the user's first name, last name, and email address in each column.
// Clicking the user's email will open an email client.
const Row = props => (
    <tr>
        <td>{props.user.first}</td>
        <td>{props.user.last}</td>
        <td><a href={"mailto:" + props.user.email}>{props.user.email}</a></td>
    </tr>
);

export default UsersTable;