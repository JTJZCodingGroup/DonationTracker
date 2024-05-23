import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth: React.FC<any> = (props) => {
    const router = useRouter();
    const { token } = parseCookies();

    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [router, token]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
