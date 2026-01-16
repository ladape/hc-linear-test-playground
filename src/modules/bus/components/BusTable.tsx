import type { Bus } from '../types/bus.type';
import { TableStyle } from '../../../shared/common/styles/common.style';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

interface Props {
  buses: Bus[];
  onDelete: (id: number) => Promise<void> | void;
  onEdit?: (id: number) => void;
}

export function BusTable({ buses, onDelete, onEdit }: Props) {
  return (
    <TableStyle>
      <thead>
        <tr>
          <th>ID</th>
          <th>Rendszám</th>
          <th>Modell</th>
          <th>Állapot</th>
          <th>Kapacitás</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {buses.map((b) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.plate}</td>
            <td>{b.model}</td>
            <td>{b.status}</td>
            <td>{b.capacity}</td>
            <td>
              <IconButton size="small" aria-label="view" component={Link} to={`./${b.id}`} sx={{ color: 'white' }}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={() => onEdit?.(b.id)}
                sx={{ color: 'white' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="delete" onClick={() => onDelete(b.id)} sx={{ color: 'white' }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}

