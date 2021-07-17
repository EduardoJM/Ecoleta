import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../redux';

function useAuth() {
    const { user } = useSelector((store: Store) => store.auth);
    const logged = useMemo(() => user !== null, [user]);

    return { user, logged };
};

export default useAuth;
