import { useState, useEffect } from 'react';
import { z } from 'zod';
import type { Bus } from '../types/bus.type';
import Modal from '../../../component/ui/Modal/Modal';
import {
  FormContainer,
  FormRow,
  Label,
  Input,
  Select,
  ErrorMessage,
  InputWithError,
  FormFooter,
  Button,
  FormTitle,
} from '../style/createBusForm.style';

interface Props {
  initial?: Partial<Omit<Bus, 'id'>>;
  onSubmit: (payload: Omit<Bus, 'id'>) => Promise<void> | void;
  onClose: () => void;
  open: boolean;
  submitLabel?: string;
  loading?: boolean;
}

// Validation schema using Zod
const busFormSchema = z.object({
  plate: z.string()
    .min(1, 'A rendszám kitöltése kötelező')
    .min(6, 'A rendszám legalább 6 karakter hosszú kell legyen')
    .toUpperCase(),
  model: z.string()
    .min(1, 'A modell kitöltése kötelező')
    .min(2, 'A modell legalább 2 karakter hosszú kell legyen'),
  status: z.enum(['operational', 'maintenance']),
  capacity: z.number()
    .min(1, 'A kapacitás legalább 1 kell legyen')
    .max(200, 'A kapacitás maximum 200 lehet'),
});

interface FormErrors {
  plate?: string;
  model?: string;
  status?: string;
  capacity?: string;
}

export function CreateBusForm({ initial, onSubmit, onClose, open, submitLabel = 'Mentés', loading = false }: Props) {
  const [form, setForm] = useState({
    plate: '',
    model: '',
    status: 'operational',
    capacity: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        plate: initial.plate ?? '',
        model: initial.model ?? '',
        status: (initial.status as 'operational' | 'maintenance') ?? 'operational',
        capacity: initial.capacity ?? 0,
      });
      setErrors({});
    }
  }, [initial]);

  const validateForm = (): boolean => {
    try {
      busFormSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          newErrors[path as keyof FormErrors] = issue.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleClose = () => {
    setForm({
      plate: '',
      model: '',
      status: 'operational',
      capacity: 0,
    });
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({ plate: form.plate, model: form.model, status: form.status, capacity: form.capacity });
      handleClose();
    } catch (error) {
      console.error('Hiba az adatok mentésekor:', error);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={handleClose} ariaLabel={submitLabel}>
      <FormTitle>{submitLabel}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormRow>
            <Label htmlFor="plate">Rendszám</Label>
            <InputWithError hasError={!!errors.plate}>
              <Input
                id="plate"
                type="text"
                value={form.plate}
                onChange={(e) => setForm({ ...form, plate: e.target.value })}
                placeholder="Pl: ABC123"
              />
              {errors.plate && <ErrorMessage>{errors.plate}</ErrorMessage>}
            </InputWithError>
          </FormRow>

          <FormRow>
            <Label htmlFor="model">Modell</Label>
            <InputWithError hasError={!!errors.model}>
              <Input
                id="model"
                type="text"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="Pl: Volvo B13R"
              />
              {errors.model && <ErrorMessage>{errors.model}</ErrorMessage>}
            </InputWithError>
          </FormRow>

          <FormRow>
            <Label htmlFor="status">Állapot</Label>
            <InputWithError hasError={!!errors.status}>
              <Select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="operational">Operational</option>
                <option value="maintenance">Maintenance</option>
              </Select>
              {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
            </InputWithError>
          </FormRow>

          <FormRow>
            <Label htmlFor="capacity">Kapacitás</Label>
            <InputWithError hasError={!!errors.capacity}>
              <Input
                id="capacity"
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                placeholder="Pl: 50"
                min="1"
                max="200"
              />
              {errors.capacity && <ErrorMessage>{errors.capacity}</ErrorMessage>}
            </InputWithError>
          </FormRow>
        </FormContainer>

        <FormFooter>
          <Button
            buttonVariant="secondary"
            type="button"
            onClick={handleClose}
          >
            Mégsem
          </Button>
          <Button
            buttonVariant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Mentés...' : submitLabel}
          </Button>
        </FormFooter>
      </form>
    </Modal>
  );
}
