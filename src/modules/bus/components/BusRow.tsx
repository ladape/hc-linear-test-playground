import {Link} from 'react-router-dom';
import type {Bus} from '../types/bus.type';
import {IconButton} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    bus: Bus,
    onEdit?: (id: number) => void,
    onDeleteClick: (bus: Bus) => void,
    onDelete?: (id: number) => (Promise<void> | void)
}

export function BusRow({bus, onEdit, onDeleteClick}: Props) {
    const statusText = bus.status === 'operational' ? 'Üzemképes' : 'Karbantartás alatt áll';

    return (
        <tr>
            <td>{bus.id}</td>
            <td>{bus.plate}</td>
            <td>{bus.model}</td>
            <td>{statusText}</td>
            <td>{bus.capacity}</td>
            <td>
                <IconButton size="small" aria-label="view" component={Link} to={`./${bus.id}`} sx={{color: 'white'}}>
                    <VisibilityIcon fontSize="small"/>
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="edit"
                    onClick={() => onEdit?.(bus.id)}
                    sx={{color: 'white'}}
                >
                    <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton size="small" aria-label="delete" onClick={() => onDeleteClick(bus)} sx={{color: 'white'}}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </td>
        </tr>
    );
}

