import React from 'react';
import Form from './Form';
import { mount, shallow } from 'enzyme';

function renderBookForm(args) {
  const defaultProps = {
    book: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<Form {...props} />);
}
function renderBookFormMount(args) {
  const defaultProps = {
    book: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<Form {...props} />);
}

it('renders form and header', () => {
  const wrapper = renderBookForm();
  expect(wrapper.find('Form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Añadir libro');
});

it('labels save buttons as "Guardar" when not saving', () => {
  const wrapper = renderBookFormMount();
  expect(wrapper.find('Button').at(1).text().includes('Guardar')).toBe(true);
});
