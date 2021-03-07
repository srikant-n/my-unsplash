import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeletePhoto from './DeletePhoto';

describe('Delete Photo modal render tests', ()=>{
    test('Name and url field are in document', () => {
        const {getByLabelText} = render(<DeletePhoto show={true}/>);

        expect(getByLabelText("Password")).toBeInTheDocument();
    });

    test('Not rendred when show is false', () => {
        const {queryByLabelText} = render(<DeletePhoto show={false}/>);

        expect(queryByLabelText("Password")).not.toBeInTheDocument();
    });

    test('Given error is rendered', () =>{
        const error = "Testing displayed error";
        const {getByText} = render(<DeletePhoto show={true} errorMessage={error} />);

        expect(getByText(error)).toBeInTheDocument();
    });
});

describe('Delete Photo modal callback tests', ()=>{

    test('Submit sends entered password', () => {
        const passwordSent = "123";
        const onSubmit = (password) => {
            expect(password).toEqual(passwordSent);
        };
        const {getByLabelText} = render(<DeletePhoto show={true} onSubmit={onSubmit}/>);
        userEvent.type(getByLabelText("Password"), passwordSent);
    });

    test('closing calls onClose', () => {
        const onClose = jest.fn();
        const {getByText} = render(<DeletePhoto show={true} onClose={onClose}/>);
        fireEvent.click(getByText("Close"));
        expect(onClose.mock.calls.length).toBe(1);
    });
});