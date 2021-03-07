import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPhoto from './AddPhoto';

describe('Add Photo modal tests', ()=>{
    test('Name and url field are in document', () => {
        const {getByLabelText} = render(<AddPhoto show={true}/>);

        expect(getByLabelText("Name")).toBeInTheDocument();
        expect(getByLabelText("Photo Link")).toBeInTheDocument();
    });

    test('Not rendred when show is false', () => {
        const {queryByLabelText} = render(<AddPhoto show={false}/>);

        expect(queryByLabelText("Name")).not.toBeInTheDocument();
        expect(queryByLabelText("Photo Link")).not.toBeInTheDocument();
    });

    test('Submit sends name and url', () => {
        const nameEntered = "Some Name";
        const urlEntered = "test.com";
        const onSubmit = (url, name) => {
            expect(name).toEqual(nameEntered);
            expect(url).toEqual(urlEntered);
        };
        const {getByLabelText} = render(<AddPhoto show={true} onSubmit={onSubmit}/>);
        userEvent.type(getByLabelText("Name"), nameEntered);
        userEvent.type(getByLabelText("Photo Link"), urlEntered);
    });

    test('closing calls onClose', () => {
        const onClose = jest.fn();
        const {getByText} = render(<AddPhoto show={true} onClose={onClose}/>);
        fireEvent.click(getByText("Close"));
        expect(onClose.mock.calls.length).toBe(1);
    });
});