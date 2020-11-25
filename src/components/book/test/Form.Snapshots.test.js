import React from 'react';
import BookForm from '../Form';
import renderer from 'react-test-renderer';
import { books } from '../../../../tools/mockData';

it('sets submit button label "Guardando..." when saving is true', () => {
  const tree = renderer.create(
    <BookForm book={books[0]} onSave={jest.fn()} onChange={jest.fn()} saving />
  );

  expect(tree).toMatchSnapshot();
});

it('sets submit button label "Guardar" when saving is false', () => {
  const tree = renderer.create(
    <BookForm
      book={books[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
