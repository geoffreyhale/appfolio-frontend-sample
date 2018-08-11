import React from 'react';
import renderer from 'react-test-renderer';

import UsersTableRow from './UsersTableRow';

describe('UsersTableRow', () => {
    const component = renderer.create(
        <UsersTableRow
            user={{
                first: "firstName",
                last: "lastName",
                email: "test@example.com"
            }}
        />
    );
    const usersTable = component.toJSON();

    test('is a table row', () => {
        expect(usersTable.type).toBe('tr');
    });

    /**
     * Clicking the user's email will open an email client.
     */
    const emailTd = usersTable.children[2]; //@todo fix inflexible case, hard-coded col number

    test('has mailto link', () => {
        expect(emailTd.children[0].type === 'a');
        expect(emailTd.children[0].props.href).toEqual(
            expect.stringContaining('mailto:')
        );
    });

});
