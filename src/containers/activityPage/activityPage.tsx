import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, frFR, GridCellEditCommitParams, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import activityService from '../../api/services/activityService';

const locale = frFR.components.MuiDataGrid.defaultProps.localeText;

function ActivityPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    
    const [pageNumber, setPageNumber] = useState<number>(0)

    const columns: GridColumns = [
        {
            field: 'id',
            headerName: "Numéro",
            type: 'number',
            width: 100,
            hideable: false
        },
        {
            field: 'name',
            headerName: "Nom",
            type: 'text',
            editable: true,
            width: 950,
            hideable: false
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            // eslint-disable-next-line arrow-body-style
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem icon={<DeleteIcon />} label="Supprimer" onClick={() => handleDeleteClick(id)} color="inherit" />
                ]
            }
        }
    ]

    const activities = useInfiniteQuery(
    ["activities", pageNumber, search],
    () => 
        activityService.getAllPaginated({
            page: pageNumber,
            size: 20,
            name: search !== '' ? search : null,
            sort: 'id,asc'
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

    const handleCellEditCommit = async (params: GridCellEditCommitParams) => {
        activityService.put({
            id: params.id,
            [params.field]: params.value
        }, params.id)
            .then((resp) => {
                activities.refetch()
                Swal.fire({
                    title: "Cette activité a bien été sauvegardée.",
                    icon: "success",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            })
            .catch((reason) => {
                Swal.fire({
                    title: "Erreur, veuillez recommencer la saisie.",
                    icon: "error",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            })
    }

    const handleDeleteClick = async (id: any) => {
        activityService.delete(id)
            .then((resp) => {
                activities.refetch()
                Swal.fire({
                    title: "Cette activité a bien été supprimée.",
                    icon: "success",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            })
            .catch((reason) => {
                Swal.fire({
                    title: "Erreur lors de la suppression.",
                    icon: "error",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            })
    }

    const addActivity = () => {
        Swal.fire({
            title: "Ajouter une activité",
            input: "text",
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            showLoaderOnConfirm: true,
            preConfirm: (name: string) => {
                activityService.post({ name })
                    .then(resp => {
                        activities.refetch()
                    })
                    .catch(error => {
                        Swal.showValidationMessage("Erreur, veuillez recommencer la saisie.")
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cette activité a bien été sauvegardée.',
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            }
        })
    }

    return (
        <section className="page activity-page">
            <header className="activity-page-header m-4">
                <TextField id="searchActivityName" label="Rechercher une activité par nom" style={{ width: '75%' }} value={search} onChange={onChange} />
            </header>

            <div className="content" style={{ height: 400 }}>
                <Button type="button" className="activity-tile activity-tile--add mb-4" onClick={addActivity}>
                    <span>
                        <AddIcon />
                    </span>
                    Ajouter une activité
                </Button>
                {activities?.data?.pages?.map((page) => (
                    <DataGrid columns={columns} rows={page?.content} rowCount={page?.totalElements} pageSize={page?.size} loading={activities?.isLoading} pagination paginationMode="server" rowsPerPageOptions={[20]} localeText={locale} onPageChange={onPageChange} onCellEditCommit={handleCellEditCommit} />
                ))}
            </div>
        </section>
    );

}

export default ActivityPage;