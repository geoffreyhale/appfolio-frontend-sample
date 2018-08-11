import PropTypes from 'prop-types';
import React from 'react';

/**
 * The table header should show which column is currently sorted by, and direction.
 */
const SortableTableHeaderCell = props => {
    const getSortIcon = () => {
        if (props.sortOnKey == null) {
            return null;
        }

        if (props.currentSortKey == props.sortKey) {
            if (props.currentSortDir == 'asc') {
                return <i className='fa fa-fw fa-sort-up' />;
            } else if (props.currentSortDir == 'desc') {
                return <i className='fa fa-fw fa-sort-down' />;
            }
        }
        return <i className='fa fa-fw fa-sort' />;
    };

    const handleOnClick = () => {
        if (props.sortOnKey == null) {
            return null;
        }

        return (e) => props.sortOnKey(props.sortKey, e);
    };

    return (
        <th onClick={handleOnClick()}>
            {props.text}
            {getSortIcon()}
        </th>
    );
};

SortableTableHeaderCell.propTypes = {
    currentSortDir: PropTypes.string,
    currentSortKey: PropTypes.string,
    sortKey: PropTypes.string.isRequired,
    sortOnKey: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default SortableTableHeaderCell;