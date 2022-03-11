import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';
import activityService from '../../api/services/activityService';

const locale = frFR.components.MuiDataGrid.defaultProps.localeText;

function ActivityPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    
    const [pageNumber, setPageNumber] = useState<number>(0)

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: "Numéro",
            width: 250,
            hideable: false
        },
        {
            field: 'name',
            headerName: "Nom",
            width: 850,
            hideable: false
        }
    ]

    const activities = useInfiniteQuery(
    ["activities", pageNumber, search],
    () => 
        activityService.getAllPaginated({
            page: pageNumber,
            size: 20,
            name: search !== '' ? search : null
        }),
        {
            keepPreviousData: true,
            getNextPageParam: data => {
				if (data.number < data.totalPages - 1) {
					return data.number + 1
				}
				return false
			},
            getPreviousPageParam: data => {
				if (data.number > 0) {
					return data.number - 1
				}
				return false
			}
        }
    )

    const onChange = (evt: any) => {
        evt.preventDefault()
        setSearch(evt.target.value)
    }

    const onPageChange = (page: number) => {
        if (page > pageNumber) {
            activities.fetchNextPage()
            setPageNumber(page)
        }
        else if (page < pageNumber) {
            activities.fetchPreviousPage()
            setPageNumber(page)
        }
    }

    return (
        <section className="page activity-page">
            <header className="activity-page-header m-4">
                <TextField id="searchActivityName" label="Rechercher une activité par nom" style={{ width: '75%' }} value={search} onChange={onChange} />
            </header>

            <div className="content" style={{ height: 400 }}>
                {activities?.data?.pages?.map((page) => (
                    <DataGrid columns={columns} rows={page?.content} rowCount={page?.totalElements} pageSize={page?.size} loading={activities?.isLoading} pagination paginationMode="server" rowsPerPageOptions={[20]} localeText={locale} onPageChange={onPageChange} />
                ))}
            </div>
        </section>
    );

}

export default ActivityPage;