import React from 'react';
import ReactExport from 'react-export-excel';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const SaveBooks = ({ books }) => (
  <ExcelFile
    element={
      <Button basic className='hov'>
        <Icon name='file excel' />
        Descargar
      </Button>
    }
  >
    <ExcelSheet data={books} name='Libros'>
      <ExcelColumn label='Título' value='title' />
      <ExcelColumn label='Autor' value='author' />
      <ExcelColumn label='Categoría' value='category' />
      <ExcelColumn
        label='Editorial'
        value={col => (col.editorial ? col.editorial : '-')}
      />
      <ExcelColumn
        label='¿Prestado?'
        value={col => (col.lent_to ? col.lent_to : '-')}
      />
      <ExcelColumn
        label='Puntuación'
        value={col => (col.rating ? col.rating : '-')}
      />
    </ExcelSheet>
  </ExcelFile>
);

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SaveBooks);
