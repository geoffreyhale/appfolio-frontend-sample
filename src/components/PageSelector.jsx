import {Button} from "react-bootstrap";
import _ from "lodash";
import PropTypes from 'prop-types';
import React from "react";

const PageSelector = props => {
    const getPageMax = () => {
        return (props.itemCount / props.itemsPerPage);
    };

    const setPageToFirst = (e) => {
        e.preventDefault();
        props.setPage(1);
    };

    const setPageToPrevious = (e) => {
        e.preventDefault();
        props.setPage(Math.max(props.page - 1, 1));
    };

    const setPage = (page, e) => {
        e.preventDefault();
        props.setPage(page);
    };

    const setPageToNext = (e) => {
        e.preventDefault();
        props.setPage(Math.min(props.page + 1, getPageMax()));
    };

    const setPageToLast = (e) => {
        e.preventDefault();
        props.setPage(getPageMax());
    };

    const pageNumbers = [];
    for (let i = -2; i <= 2; i++) {
        if (props.page + i > 0 && props.page + i <= getPageMax()) {
            pageNumbers.push(props.page + i);
        }
    }

    const getFirstPageSelector = () => {
        // If there is no previous or next page, the links should be hidden or disabled.
        if (props.page <= 1) {
            return null;
        }

        return (
            <Button key="first" onClick={(e) => setPageToFirst(e)}>&laquo;</Button>
        );
    };

    const getPreviousPageSelector = () => {
        if (props.page <= 1) {
            return null;
        }

        return (
            <Button key="previous" onClick={(e) => setPageToPrevious(e)}>&lsaquo;</Button>
        );
    };

    const getPageNumberSelectors = () => {
        return (
            _.map(pageNumbers, (page) => {
                return (
                    <Button
                        className={page == props.page ? "active" : ""}
                        key={page}
                        onClick={(e) => setPage(page, e)}
                    >{page}</Button>
                );
            })
        )
    };

    const getNextPageSelector = () => {
        if (props.page == getPageMax()) {
            return null;
        }

        return (
            <Button key="next" onClick={(e) => setPageToNext(e)}>&rsaquo;</Button>
        )
    };

    const getLastPageSelector = () => {
        if (props.page == getPageMax()) {
            return null;
        }

        return (
            <Button key="last" onClick={(e) => setPageToLast(e)}>&raquo;</Button>
        )
    };

    return (
        // There should be controls below the table to go to next page, previous page, etc
        <div className={props.className}>
            {getFirstPageSelector()}
            {getPreviousPageSelector()}
            {getPageNumberSelectors()}
            {getNextPageSelector()}
            {getLastPageSelector()}
        </div>
    );
};

PageSelector.propTypes = {
    itemCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    page: PropTypes.number,
    setPage: PropTypes.func,
};

export default PageSelector;