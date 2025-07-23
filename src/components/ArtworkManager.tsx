import { useState, useEffect, useRef, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import DataTable from './datatable';
import Loading from './Loding';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

interface ApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

const API_URL = 'https://api.artic.edu/api/v1/artworks';
const PAGE_SIZE = 12;

const   ArtworkManager = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [globalSelectedIds, setGlobalSelectedIds] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const toast = useRef<Toast>(null);

  const fetchArtworks = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?page=${page}&limit=${PAGE_SIZE}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
      );
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data: ApiResponse = await response.json();
      const validArtworks = data.data.filter(artwork => artwork.id && artwork.title);
      
      setArtworks(validArtworks);
      setTotalRecords(data.pagination.total);
      
      const currentPageSelected = validArtworks.filter(artwork => 
        globalSelectedIds.has(artwork.id)
      );
      setSelectedArtworks(currentPageSelected);
      
    } catch (error) {
      console.error('Failed to fetch artworks:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load artworks. Please try again later.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  }, [globalSelectedIds]);

  const handleSelectAcrossPages = useCallback(async (count: number) => {
    setIsSelecting(true);
    try {
      const newSelectedIds = new Set<number>();
      let remaining = count;
      let page = currentPage;
      
      const takeFromCurrentPage = Math.min(remaining, artworks.length);
      artworks.slice(0, takeFromCurrentPage).forEach(artwork => {
        newSelectedIds.add(artwork.id);
      });
      remaining -= takeFromCurrentPage;
      
      while (remaining > 0) {
        page++;
        const response = await fetch(
          `${API_URL}?page=${page}&limit=${PAGE_SIZE}&fields=id,title`
        );
        const data: ApiResponse = await response.json();
        const validArtworks = data.data.filter(artwork => artwork.id && artwork.title);
        
        const take = Math.min(remaining, validArtworks.length);
        validArtworks.slice(0, take).forEach(artwork => {
          newSelectedIds.add(artwork.id);
        });
        
        remaining -= take;
      }
      
      setGlobalSelectedIds(newSelectedIds);
      await fetchArtworks(currentPage);
      
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: `Selected ${count} artworks across pages`,
        life: 3000
      });
    } catch (error) {
      console.error('Failed to select across pages:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to select artworks across pages',
        life: 3000
      });
    } finally {
      setIsSelecting(false);
    }
  }, [artworks, currentPage, fetchArtworks]);

  useEffect(() => {
    fetchArtworks(currentPage);
  }, [currentPage, fetchArtworks]);

  const handleSelectionChange = useCallback((selectedRows: Artwork[]) => {
    const newSelectedIds = new Set(globalSelectedIds);
    artworks.forEach(artwork => newSelectedIds.delete(artwork.id));
    selectedRows.forEach(artwork => newSelectedIds.add(artwork.id));
    setSelectedArtworks(selectedRows);
    setGlobalSelectedIds(newSelectedIds);
  }, [artworks, globalSelectedIds]);

  return (
    <div className="flex-1 flex flex-col">
      <Toast ref={toast} position="top-right" />
      
      {loading || isSelecting ? (
        <div className="flex-grow flex items-center justify-center min-h-[60vh]">
          <Loading />
        </div>
      ) : (
        <DataTable
          artworks={artworks}
          selectedArtworks={selectedArtworks}
          onSelectionChange={handleSelectionChange}
          totalRecords={totalRecords}
          currentPage={currentPage}
          recordsPerPage={PAGE_SIZE}
          onPageChange={setCurrentPage}
          onSelectAcrossPages={handleSelectAcrossPages}
        />
      )}


       
    </div>
  );
};

export default ArtworkManager;  