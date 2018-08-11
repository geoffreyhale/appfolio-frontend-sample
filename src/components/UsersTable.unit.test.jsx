import React from 'react';
import renderer from 'react-test-renderer';

import UsersTable from './UsersTable';

describe('UsersTable', () => {
    const component = renderer.create(
        <UsersTable users={[{}]} />
    );
    const usersTable = component.toJSON();

    test('is a table', () => {
        expect(usersTable.type).toBe('table');
    });

    /**
     * Display the user's first name, last name, and email address in each column.
     */
    test('has columns \'first\', \'last\', \'email\'', () => {
        const tableHeadersText = usersTable.children[0].children[0].children.map((th) => th.children[0].toLowerCase());

        expect(tableHeadersText).toEqual(
            expect.arrayContaining(['first','last','email'])
        );
    });
});
