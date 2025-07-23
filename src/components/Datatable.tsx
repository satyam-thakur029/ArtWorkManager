import React, { useRef, useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { OverlayPanel } from 'primereact/overlaypanel';
import Pagination from './Paginator';
import type { Artwork } from '../types/artwork';

interface DataTableProps {
  artworks: Artwork[];
  selectedArtworks: Artwork[];
  onSelectionChange: (selectedRows: Artwork[]) => void;
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  onSelectAcrossPages?: (count: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  artworks,
  selectedArtworks,
  onSelectionChange,
  totalRecords,
  currentPage,
  recordsPerPage,
  onPageChange,
  loading = false,
  onSelectAcrossPages,
}) => {
  const op = useRef<OverlayPanel>(null);
  const [rowCount, setRowCount] = useState<number | null>(null);

  const getColumnValue = (row: Artwork, field: keyof Artwork, fallback = 'Unknown') => {
    return row[field] ?? fallback;
  };

  const titleHeaderTemplate = (
    <div className="flex align-items-center">
      <span 
        className="text-gray-500 cursor-pointer hover:bg-gray-100 rounded transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          op.current?.toggle(e);
        }}
        title="Select records across pages"
      >
        <i className="pi pi-chevron-down" />
      </span>
    </div>
  );

  return (
    <div className="card">
      <PrimeDataTable
        value={artworks}
        selection={selectedArtworks}
        onSelectionChange={(e) => onSelectionChange(e.value)}
        selectionMode="multiple"
        dataKey="id"
        stripedRows
        loading={loading}
        responsiveLayout="scroll"
        emptyMessage="No artworks found."
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3.5rem' }} frozen />
        <Column header={titleHeaderTemplate}/>
        <Column field="title" header="Title" body={(row) => getColumnValue(row, 'title', 'Untitled')} style={{ minWidth: '200px' }} />
        <Column field="place_of_origin" header="Origin" body={(row) => getColumnValue(row, 'place_of_origin')} style={{ minWidth: '150px' }} />
        <Column field="artist_display" header="Artist" body={(row) => getColumnValue(row, 'artist_display', 'Unknown Artist')} style={{ minWidth: '200px' }} />
        <Column field="date_start" header="Start Date" body={(row) => getColumnValue(row, 'date_start', '?')} style={{ minWidth: '100px' }} />
        <Column field="date_end" header="End Date" body={(row) => getColumnValue(row, 'date_end', '?')} style={{ minWidth: '100px' }} />
        <Column field="inscriptions" header="Inscriptions" body={(row) => getColumnValue(row, 'inscriptions', 'None')} style={{ minWidth: '150px' }} />
      </PrimeDataTable>

      <OverlayPanel ref={op} dismissable>
        <div className="p-3" style={{ width: '250px' }}>   
          <InputNumber
            value={rowCount}
            onChange={(e) => setRowCount(e.value)}
            min={1}
            className="w-full h-12 p-inputtext-sm mb-2"
            placeholder="Select rows"
          />
          <Button 
            label="Submit" 
            className="p-button-sm w-full" 
            onClick={() => {
              if (rowCount && rowCount > 0) {
                if (onSelectAcrossPages) {
                  onSelectAcrossPages(rowCount);
                }
                op.current?.hide();
              }
            }}
          />
        </div>
      </OverlayPanel>

      <Pagination
        totalRecords={totalRecords}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DataTable;