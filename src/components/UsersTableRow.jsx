import PropTypes from 'prop-types';
import React from 'react';

// Display the user's first name, last name, and email address in each column.
// Clicking the user's email will open an email client.
const UsersTableRow = props => (
    <tr>
        <td>{props.user.first}</td>
        <td>{props.user.last}</td>
        <td><a href={"mailto:" + props.user.email}>{props.user.email}</a></td>
    </tr>
);

UsersTableRow.propTypes = {
    user: PropTypes.object,
};

export default UsersTableRow