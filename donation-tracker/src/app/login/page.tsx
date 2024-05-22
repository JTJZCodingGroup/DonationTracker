import LoginForm from './LoginForm';
import ShootingStars from '../components/shootingStars';

export default function LoginPage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="relative z-10">
        <LoginForm />
      </div>
      <ShootingStars />
    </main>
  );
}
