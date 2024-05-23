import RegisterForm from './RegisterForm';
import ShootingStars from '../components/shootingStars';

export default function RegisterPage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="relative z-10">
        <RegisterForm />
      </div>
      <ShootingStars />
    </main>
  );
}