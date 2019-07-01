import { shape, string, number } from 'prop-types';

export default shape({
  id: number.isRequired,
  first_name: string.isRequired,
  last_name: string.isRequired,
  email: string.isRequired,
  specialty: string.isRequired,
});
