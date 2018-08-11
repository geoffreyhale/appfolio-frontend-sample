import PropTypes from 'prop-types';
import React from 'react';

const PaginationDisplaying = props => {
    const low = Math.min((props.page - 1) * props.itemsPerPage + 1, props.itemsTotal);
    const high = Math.min((props.page) * props.itemsPerPage, props.itemsTotal);

    return (
        <span>Displaying: {low}-{high} of {props.itemsTotal}</span>
    );
};

PaginationDisplaying.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    itemsTotal: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired
};

export default PaginationDisplaying;